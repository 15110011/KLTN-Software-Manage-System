from django_elasticsearch_dsl import DocType, Index, fields
from elasticsearch_dsl import Completion
from .models import Product

products = Index('products')
products.settings(
    number_of_shards=4,
    number_of_replicas=0
)


@products.doc_type
class ProductDocument(DocType):
    manager = fields.TextField(attr='_get_manager_product')
    product_name = fields.TextField(attr='_get_product_name',
                                    fields={
                                        'raw': fields.StringField(analyzer='keyword'),
                                        'suggest': fields.CompletionField(attr='_get_product_name',
                                         contexts=[{"name": "manager", "type": "category", "path": "manager"}]),
                                    }
                                    )

    class Meta:
        model = Product
        fields = ['name', 'desc', 'status']
