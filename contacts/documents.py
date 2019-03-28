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
    class Meta:
        model = Contact
        fields = Contact.field_names