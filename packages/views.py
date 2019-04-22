from django.shortcuts import render
from django.db.models import Q
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.forms.models import model_to_dict


from rest_framework import status
from .serializers import ProductSerializier, PackageSerializer, CreateProductSerializer, PackageHistorySerializer, ProductCategorySerializer, ProductTypeSerializer
from .models import Product, Package, PackageHistory, ProductCategory, ProductType
from .documents import PackageDocument, ProductDocument
# Create your views here.


class ProductCategoryView(ModelViewSet):
    serializer_class = ProductCategorySerializer
    queryset = ProductCategory.objects
    permission_classes = (IsAuthenticated, IsAdminUser,)


class ProductTypeView(ModelViewSet):
    serializer_class = ProductTypeSerializer
    queryset = ProductType.objects
    permission_classes = (IsAuthenticated, IsAdminUser,)


class ProductViewSet(ModelViewSet):
    serializer_class = ProductSerializier
    queryset = Product.objects.prefetch_related('features')
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        if not bool(self.request.query_params):
            return super().get_queryset()
        search = ProductDocument.search()
        if 'name' in self.request.query_params.keys():
            qs = self.request.query_params.get('name')
            search = search.query('multi_match', query=qs, fields=['name^4'])
            products = [model_to_dict(products)
                        for products in search.to_queryset()]
            return {"data": products, "elastic_search": True}

        if 'status' in self.request.query_params.keys():
            qs = self.request.query_params.get('status')
            search = search.filter('term', status=qs.lower())
            products = [model_to_dict(product)
                        for product in search.to_queryset()]

            return {"data": products, "elastic_search": True}

    def list(self, request, *args, **kwargs):
        qs = self.get_queryset()
        if type(qs) is dict and qs.get('elastic_search', None):
            return Response(qs)

        product_suggest = self.request.query_params.get(
            'product_suggest', None)
        filters = Q()
        if product_suggest:
            filters.add(Q(name__icontains=product_suggest), Q.AND)
            filters.add(Q(status='ACTIVE'), Q.AND)
            queryset = Product.objects.filter(filters)
            serializer = self.get_serializer(queryset, many=True)
            return Response({"suggestion": [s['name'] for s in serializer.data], "elastic_search": True})

        limit = self.request.query_params.get('limit', None)
        page = self.request.query_params.get('page') if int(
            self.request.query_params.get('page', 0)) > 0 else 0
        if limit is not None:
            queryset = Product.objects.filter()[
                int(page)*int(limit):int(page)*int(limit)+int(limit)]
        else:
            queryset = qs.filter(manager=request.user)
        serializer = self.get_serializer(queryset, many=True)
        new_serializer = {}
        new_serializer['data'] = serializer.data
        new_serializer['total'] = Product.objects.filter().count()
        return Response(new_serializer, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = CreateProductSerializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = CreateProductSerializer(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PackageViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = PackageSerializer
    queryset = Package.objects

    def get_queryset(self):
        if not bool(self.request.query_params):
            return super().get_queryset()
        search = PackageDocument.search()
        if 'name' in self.request.query_params.keys():
            qs = self.request.query_params.get('name')
            search = search.query('multi_match', query=qs, fields=['name^4'])
            found_packages = []
            for packages in search.to_queryset():
                packages = model_to_dict(packages)
                features = packages.get('features')
                if len(features) > 0:
                    packages['product'] = model_to_dict(features[0].product)
                else:
                    packages['product'] = {}

                features = [model_to_dict(feature) for feature in features]

                packages['features'] = features
                found_packages.append(packages)
            return {"packages": found_packages, "elastic_search": True}

        if 'package_suggest' in self.request.query_params.keys():
            qs = self.request.query_params.get('package_suggest')
            suggest = search.suggest('auto_complete', qs, completion={
                                     'field': 'package_name.suggest'
                                     })
            response = suggest.execute()
            suggestion = [
                option._source.package_name for option in response.suggest.auto_complete[0].options]
            return {"suggestion": suggestion, "elastic_search": True}

    def list(self, request, *args, **kwargs):
        qs = self.get_queryset()
        filters = Q()
        if type(qs) is dict and qs.get('elastic_search', None):
            return Response(qs)
        search_product = self.request.query_params.get('searchProduct', None)
        limit = self.request.query_params.get('limit', None)
        page = self.request.query_params.get('page') if int(
            self.request.query_params.get('page', 0)) > 0 else 0
        if search_product:
            filters.add(Q(features__product__id=search_product), Q.AND)
        if limit is not None and search_product is not None:
            queryset = Package.objects.filter(filters)[
                int(page)*int(limit):int(page)*int(limit)+int(limit)]
        else:
            queryset = Package.objects.filter(filters)
        serializer = self.get_serializer(queryset, many=True)
        new_serializer = {}
        new_serializer['data'] = serializer.data
        new_serializer['total'] = Package.objects.filter(filters).count()
        return Response(new_serializer, status=status.HTTP_200_OK)


class PackageHistoryViewSet(ModelViewSet):
    serializer_class = PackageHistorySerializer
    queryset = PackageHistory.objects
