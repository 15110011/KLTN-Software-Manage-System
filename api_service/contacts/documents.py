from django_elasticsearch_dsl import DocType, Index, fields
from elasticsearch_dsl import Completion
from .models import Contact, ContactGroup

contacts = Index('contacts')
contacts.settings(
    number_of_shards=4,
    number_of_replicas=0
)


@contacts.doc_type
class ContactDocument(DocType):
    full_name = fields.TextField(attr='_get_fullname',
                                 fields={
                                     'raw': fields.StringField(analyzer='keyword'),
                                     'suggest': fields.CompletionField(attr='_get_fullname')
                                 })

    class Meta:
        model = Contact
        fields = ['first_name', 'last_name']
