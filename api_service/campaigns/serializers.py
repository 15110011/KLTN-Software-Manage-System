
from django.forms.models import model_to_dict
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.fields import set_value
from account.serializers import MeSerializer
from steps.serializers import StepSerializer, StepWithOutFollowUpSerializer
from packages.serializers import PackageSerializer, ProductSerializier
# from contacts.serializers import ContactWithoutGroupSerializer
from orders.models import Order
from steps.models import Step, StepDetail
from contacts.models import Contact
from events.models import Event
from . import models, handle_mail_template
import django_rq
from datetime import datetime, timedelta, timezone
import calendar
from KLTN.common import send_email
import requests
import json
import logging
logger = logging.getLogger(__name__)


def send_email_api(user, to_address, from_address, subject, message, contact_marketing_id):
    data = json.dumps({"data": {"user_id": user.id, "to": to_address, "from": from_address,
                                "subject": subject, "message": message}})
    request = requests.post('http://emails:8001/api/v1/send-email',
                            data=data, headers={'Content-Type': 'application/json'})
    res = request.json()
    # try:
    contact_marketing = models.ContactMarketing.objects.get(
        id=contact_marketing_id)
    contact_marketing.thread_ids.append(
        {'thread_id': res['thread_id'], 'type': 'Send Email'})
    contact_marketing.save()
    # except:
    #    pass


def send_email_api_step(user, to_address, from_address, subject, message, step_detail_id):
    data = json.dumps({"data": {"user_id": user.id, "to": to_address, "from": from_address,
                                "subject": subject, "message": message}})
    request = requests.post('http://emails:8001/api/v1/send-email',
                            data=data, headers={'Content-Type': 'application/json'})
    res = request.json()
    # try:
    step_detail = StepDetail.objects.get(id=step_detail_id)
    step_detail.thread.append(
        {'thread_id': res['thread_id'], 'type': 'Send Email'})
    step_detail.save()
    # except:
    #    pass


class MailTemplateSerializer(serializers.ModelSerializer):

    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    id = serializers.IntegerField(required=False)

    class Meta:
        model = models.MailTemplate
        fields = '__all__'


class NoteSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = models.Note
        fields = '__all__'


class MarketingPlanSerializer(serializers.ModelSerializer):
    can_remove = serializers.SerializerMethodField()
    mail_template = MailTemplateSerializer()

    class Meta:
        model = models.MarketingPlan
        fields = '__all__'

    def get_can_remove(self, instance):
        if instance.campaigns.all():
            return False
        return True

    def update(self, instance, validated_data):
        mail_template = validated_data.pop('mail_template', None)
        instance = super().update(instance, validated_data)
        if mail_template:
            instance.mail_template = models.MailTemplate.objects.get(
                id=mail_template['id'])
            instance.save()
        return instance


class CreateMarketingPlanSerializer(serializers.ModelSerializer):
    manager = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = models.MarketingPlan
        fields = "__all__"

    def create(self, validated_data):
        marketing_plan = super().create(validated_data)
        return marketing_plan


class FollowUpPlanSerializer(serializers.ModelSerializer):
    steps = StepWithOutFollowUpSerializer(many=True)

    class Meta:
        model = models.FollowUpPlan
        fields = '__all__'


class CreateFollowUpPlanSerializer(serializers.ModelSerializer):
    steps = StepWithOutFollowUpSerializer(many=True)
    manager = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = models.FollowUpPlan
        fields = '__all__'

    def create(self, validated_data):
        steps = validated_data.pop('steps')
        followup_plan = super().create(validated_data)
        steps = [Step(**item, follow_up=followup_plan) for item in steps]
        steps = Step.objects.bulk_create(steps)
        return followup_plan

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        steps = validated_data.get('steps')
        if steps is not None:
            for item in steps:
                try:
                    step_id = item['id']
                    step = Step.objects.get(id=step_id)
                    step.actions = item.get('actions', step.actions)
                    step.duration = item.get('duration', step.duration)
                    step.conditions = item.get('conditions', step.conditions)
                    step.mail_template = item.get(
                        'mail_template', step.mail_template)
                    step.save()
                except:
                    step = Step(**item)
                    step.save()
        return instance


class ReportCampaignSerializer(serializers.ModelSerializer):
    packages = PackageSerializer(many=True)
    manager = MeSerializer()
    product = serializers.SerializerMethodField()

    class Meta:
        model = models.Campaign
        fields = '__all__'

    def get_product(self, instance):
        try:
            return ProductSerializier(instance.packages.all()[0].features.all()[0].product).data
        except:
            return None


class CampaignSerializer(serializers.ModelSerializer):
    follow_up_plan = FollowUpPlanSerializer()
    marketing_plan = MarketingPlanSerializer()
    manager = MeSerializer()
    packages = PackageSerializer(many=True)
    notes = NoteSerializer(many=True)
    product = serializers.SerializerMethodField()
    contacts = serializers.SerializerMethodField()

    class Meta:
        model = models.Campaign
        fields = '__all__'

    def get_product(self, instance):
        try:
            return ProductSerializier(instance.packages.all()[0].features.all()[0].product).data
        except:
            return None

    def get_contacts(self, instance):
        orders = Order.objects.filter(campaign=instance)
        contacts = [model_to_dict(o.contacts) for o in orders.all()]
        contact_distinct = set([c['id'] for c in contacts])

        marketings = models.ContactMarketing.objects.filter(campaign=instance)
        contacts += [model_to_dict(m.contact) for m in marketings.all()
                     if not m.contact.id in contact_distinct]
        return contacts


class CreateContactMarketingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ContactMarketing
        fields = '__all__'


class CreateCampaignSerializer(serializers.ModelSerializer):
    manager = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = models.Campaign
        fields = '__all__'

    def send_mail_scheduled(user, subject, msg):
        queue = django_rq.get_queue('default', is_async=True)
        queue.enqueue(send_email, user, subject, msg)

    def create(self, validated_data):
        sale_reps = validated_data.pop('assigned_to')
        packages = validated_data.pop('packages')
        contacts = validated_data.pop('contacts', None)
        campaign = super().create(validated_data)
        campaign.assigned_to.set(sale_reps)
        campaign.packages.set(packages)
        scheduler = django_rq.get_scheduler('default')
        timestamp1 = calendar.timegm(
            (campaign.start_date + timedelta(days=1)).timetuple())
        start_date = datetime.utcfromtimestamp(timestamp1)
        now = datetime.now()

        if contacts is not None:
            for index, contact in enumerate(contacts):
                cur_contact = Contact.objects.get(id=contact)

                if 'Send Email' in campaign.marketing_plan.actions:
                    contact_marketing = models.ContactMarketing(
                        marketing_plan=validated_data['marketing_plan'], contact=cur_contact, campaign=campaign, sale_rep=sale_reps[index % len(
                            sale_reps)]
                    )
                    contact_marketing.save()
                    job = scheduler.schedule(
                        scheduled_time=now,
                        func=send_email_api,
                        args=[self.context.get(
                            'request').user, cur_contact.mail, "theaqvteam@gmail.com", campaign.marketing_plan.mail_template.subject, handle_mail_template.manipulate_template(campaign.marketing_plan.mail_template.template, contact=cur_contact), contact_marketing.id],
                        interval=604800,
                        kwargs={},
                        repeat=10,
                    )
                    contact_marketing.job_id = job.id
                    contact_marketing.save()
                else:
                    contact_marketing = models.ContactMarketing(
                        marketing_plan=validated_data['marketing_plan'], contact=cur_contact, campaign=campaign, sale_rep=sale_reps[index % len(
                            sale_reps)]
                    )
                    contact_marketing.save()
                event = Event(
                    user=self.context.get('request').user, assigned_to=sale_reps[index % len(sale_reps)], content='Contact {} {}'.format(
                        cur_contact.first_name, cur_contact.last_name),
                    start_date=campaign.start_date, end_date=campaign.start_date, name=f'Start contacting ' + f'{cur_contact.first_name} {cur_contact.last_name}', marketing=contact_marketing
                )
                event.save()
                event.contacts.set([cur_contact])

        return campaign

    def update(self, instance, validated_data):
        contacts = validated_data.pop('contacts', None)
        campaign = super().update(instance, validated_data)
        return campaign

    def to_internal_value(self, data):
        contacts = data.pop('contacts', None)
        ret = super().to_internal_value(data)
        set_value(ret, ['contacts'], contacts)
        return ret


class ContactMarketingHistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.ContactMarketingHistory
        fields = '__all__'


class ContactInCampaignSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = models.Contact
        fields = '__all__'

    def get_full_name(self, instance):
        return f'{instance.first_name} {instance.last_name}'


class ContactMarketingSerializer(serializers.ModelSerializer):
    marketing_plan = MarketingPlanSerializer()
    campaign = CampaignSerializer()
    histories = ContactMarketingHistorySerializer(many=True)
    contact = ContactInCampaignSerializer()

    class Meta:
        model = models.ContactMarketing
        fields = '__all__'

    def update(self, instance, validated_data):
        super().update(instance, validated_data)
        status = validated_data.get('status', None)
        if status == 'COMPLETED':
            new_order = Order.objects.create(
                contacts=instance.contact, sale_rep=self.context.get('request').user, campaign=instance.campaign)
            steps = new_order.campaign.follow_up_plan.steps.all()
            step_details = [StepDetail(step=s, order=new_order, information={})
                            for s in steps]
            step_details[len(step_details) - 1].information = {
                "Choose Packages": {
                    "type": 'final', "result": {}
                }
            }
            step_details[len(step_details) - 1].information['Choose Packages']['result'] = {
                f'{p.id}': {} for p in instance.campaign.packages.all()
            }

            step_details = StepDetail.objects.bulk_create(step_details)
            if "Send Email" in steps[0].actions:
                cur_contact = step_details[0].order.contacts
                queue = django_rq.get_queue('default', is_async=True)
                queue.enqueue(send_email_api_step, self.context.get(
                    'request').user, cur_contact.mail, "theaqvteam@gmail.com", steps[0].mail_template.subject, handle_mail_template.manipulate_template(steps[0].mail_template.template, contact=cur_contact), step_details[0].id)

        return instance


class ContactMarketingSerializer2(serializers.ModelSerializer):

    class Meta:
        model = models.ContactMarketing
        fields = '__all__'
