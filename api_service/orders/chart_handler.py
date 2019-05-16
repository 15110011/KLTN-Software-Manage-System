from django.db.models import Q, Count
from datetime import datetime, date
from .models import Order, OrderHistory, License, LifetimeLicense
from .serializers import OrderChartSerializer, OrderSaleRepChartSerializer
from campaigns.models import ContactMarketing

cur_year = datetime.today().year
start_date_of_year = date(cur_year, 1, 1)


def overview_chart(duration, target, filters):
    result = {}
    if duration == 'month':
        filters.add(Q(created__gte=start_date_of_year), Q.AND)
        filters.add(Q(created__month=target), Q.AND)
        # Success deal
        success_deal = Order.objects.filter(
            filters).filter(status='COMPLETED').count()
        # Failed deal

        failed_deal = Order.objects.filter(
            filters).filter(status='FAILED').count()
        failed_deal += ContactMarketing.objects.filter(status='FAILED').count()

        # Waiting list
        waiting_list = ContactMarketing.objects.filter(
            status='RUNNING').count()
        # Follow up
        follow_up = Order.objects.filter(
            filters).filter(status='RUNNING').count()
        result = {'success': success_deal, 'failed': failed_deal,
                  'waiting': waiting_list, 'follow_up': follow_up}
    return {"data": result}


def state_chart(duration, target, filters):
    result = []
    if duration == 'month':
        filters.add(Q(created__gte=start_date_of_year), Q.AND)
        filters.add(Q(created__month=target), Q.AND)
        queryset = Order.objects.filter(filters).values(
            'contacts__state').annotate(amount=Count('contacts__state')).order_by('amount')[:6]
        for r in queryset:
            result.append(
                {"code": r['contacts__state'], "amount": r['amount']})
    return {"data": result}


def sale_rep_chart(duration, target, filters):
    result = []
    if duration == 'month':
        filters.add(Q(created__gte=start_date_of_year), Q.AND)
        filters.add(Q(created__month=target), Q.AND)
        queryset = Order.objects.filter(filters).values(
            'sale_rep__id', 'sale_rep__username').annotate(amount=Count('status', filter=Q(status='COMPLETED'))).order_by('amount')[:10]
        # serializer = OrderSaleRepChartSerializer(queryset, many=True)

        for r in queryset:
            income = 0
            queryset_income = Order.objects.prefetch_related('packages', 'licenses', 'lifetime_licenses').filter(
                filters).filter(sale_rep=r['sale_rep__id'])
            serializer = OrderSaleRepChartSerializer(
                queryset_income, many=True)
            total = ContactMarketing.objects.filter(
                filters).filter(sale_rep=r['sale_rep__id']).count()
            for d in serializer.data:
                for l in d['licenses']:
                    income += int(l['package']['prices'][str(l['duration'])])
                for l in d['lifetime_licenses']:
                    income += int(l['package']['prices']['999999'])

            result.append({
                "sale_rep_id": r['sale_rep__id'],
                "sale_rep_name": r['sale_rep__username'],
                "amount": r['amount'],
                "total": total,
                'income': income
            })

    return {"data": result}
