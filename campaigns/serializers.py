from rest_framework import serializers
from rest_framework.fields import set_value

from account.serializers import MeSerializer
from steps.serializers import StepSerializer, StepWithOutFollowUpSerializer
from packages.serializers import PackageSerializer, ProductSerializier

from orders.models import Order
from steps.models import Step
from contacts.models import Contact
from events.models import Event

from . import models


class MailTemplateSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.MailTemplate
        fields = '__all__'


class NoteSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = models.Note
        fields = '__all__'


class MarketingPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MarketingPlan
        fields = '__all__'


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
                    step.save()
                except:
                    step = Step(**item)
                    step.save()
        return instance


class CampaignSerializer(serializers.ModelSerializer):
    follow_up_plan = FollowUpPlanSerializer()
    marketing_plan = MarketingPlanSerializer()
    manager = MeSerializer()
    packages = PackageSerializer(many=True)
    notes = NoteSerializer(many=True)
    product = serializers.SerializerMethodField()

    class Meta:
        model = models.Campaign
        fields = '__all__'

    def get_product(self, instance):
        # package = None
        # for p in instance.packages.all():
        #     package = p
        #     break
        # feature = None
        # for f in package.features.all():
        #      = p
        #     break
        try:
            return ProductSerializier(instance.packages.all()[0].features.all()[0].product).data
        except:
            return None
        # return {"product": 12312}


class CreateContactMarketingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ContactMarketing
        fields = '__all__'


class CreateCampaignSerializer(serializers.ModelSerializer):
    manager = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = models.Campaign
        fields = '__all__'

    def create(self, validated_data):
        sale_reps = validated_data.pop('assigned_to')
        packages = validated_data.pop('packages')
        contacts = validated_data.pop('contacts', None)
        campaign = super().create(validated_data)
        campaign.assigned_to.set(sale_reps)
        campaign.packages.set(packages)
        if contacts is not None:
            for index, contact in enumerate(contacts):
                cur_contact = Contact.objects.get(id=contact)
                contact_marketing = models.ContactMarketing(
                    marketing_plan=validated_data['marketing_plan'], contact=cur_contact, campaign=campaign)
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

        return instance
