from django_elasticsearch_dsl import DocType, Index, fields
from elasticsearch_dsl import Completion
from .models import Package, Product

packages = Index('packages')
packages.settings(
    number_of_shards=4,
    number_of_replicas=0
)

products = Index('products')
products.settings(
    number_of_shards=4,
    number_of_replicas=0
)


@packages.doc_type
class PackageDocument(DocType):
    # manager = fields.TextField(attr='_get_manager_product')
    package_name = fields.TextField(attr='_get_package_name',
                                    fields={
                                        'raw': fields.StringField(analyzer='keyword'),
                                        'suggest': fields.CompletionField(attr='_get_package_name')
                                        #  contexts=[{"name": "manager", "type": "category", "path": "manager"}]),
                                    }
                                    )

    class Meta:
        model = Package
        fields = ['name']


@products.doc_type
class ProductDocument(DocType):
    manager = fields.TextField(attr='_get_manager_product')

    class Meta:
        model = Product
        fields = ['name', 'status']
