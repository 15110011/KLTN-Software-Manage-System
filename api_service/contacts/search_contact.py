from django.shortcuts import render
from django.forms.models import model_to_dict
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework import status
from . import documents
from elasticsearch_dsl.query import MultiMatch
from campaigns.models import ContactMarketing
from orders.models import Order
from django.core.cache import cache



def ContactHistory(contacts):
    contact_marketing = ContactMarketing.objects.all().filter(
        contact=contacts[0]['id'])
    contact_order = Order.objects.all().filter(contacts=contacts[0]['id'])
    contact_order = [model_to_dict(order) for order in contact_order]
    campaigns = []
    conversations = []
    for contact in contact_marketing:
        campaigns.append(model_to_dict(contact.campaign))
        for thread_id in contact.thread_ids:
            conversations.append(cache.get(f'thread_{thread_id}'))
    return {"campaigns": campaigns, "conversations": conversations, "orders": contact_order}


@api_view(['GET'])
def SearchContact(request):
    search = documents.ContactDocument.search()
    start = request.query_params.get('start', None)
    end = request.query_params.get('end', None)
    if 'q' in request.query_params.keys():
        qs = request.query_params.get('q')
        match = MultiMatch(query=qs, fields=['full_name'], type='best_fields')
        search = search.query(match)[int(start): int(end)]
        contacts = [model_to_dict(contact) for contact in search.to_queryset()]
        print (ContactHistory(contacts))
        return Response({"contacts": contacts}, status=status.HTTP_200_OK)

    if 'suggest' in request.query_params.keys():
        qs = request.query_params.get('suggest')
        suggest = search.suggest('auto_complete', qs, completion={
            'field': 'full_name.suggest'})
        response = suggest.execute()
        suggestion = [
            option._source.full_name for option in response.suggest.auto_complete[0].options]
        return Response({"suggestions": suggestion}, status=status.HTTP_200_OK)
