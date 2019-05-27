from django_elasticsearch_dsl import DocType, Index, fields
from elasticsearch_dsl import Completion
from .models import MarketingPlan, FollowUpPlan, Campaign

marketing_plans = Index('marketing_plans')
marketing_plans.settings(
    number_of_shards=4,
    number_of_replicas=0
)

campaigns = Index('campaigns')
campaigns.settings(
    number_of_shards=4,
    number_of_replicas=0
)


@marketing_plans.doc_type
class MarketingPlanDocument(DocType):
    manager = fields.TextField(attr='_get_manager_plan')
    marketing_plans_name = fields.TextField(attr='_get_plan_name',
                                            fields={
                                                'raw': fields.StringField(analyzer='keyword'),
                                                'suggest': fields.CompletionField(
                                                    attr='_get_plan_name',
                                                    contexts=[{"name": "manager", "type": "category", "path": "manager"}])
                                            }
                                            )

    class Meta:
        model = MarketingPlan
        fields = ['name']


@campaigns.doc_type
class CampaignDocument(DocType):
    manager = fields.TextField(attr='_get_manager_campaign')
    campaigns_name = fields.TextField(attr='_get_campaign_name',
                                            fields={
                                                 'raw': fields.StringField(analyzer='keyword'),
                                                 'suggest': fields.CompletionField(
                                                     attr='_get_campaign_name',
                                                     contexts=[{"name": "manager", "type": "category", "path": "manager"}])
                                            }
                                            )

    class Meta:
        model = Campaign
        fields = ['name']
