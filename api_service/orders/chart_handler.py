from django.db.models import Q, Count
from datetime import datetime, date
from .models import Order, OrderHistory, License, LifetimeLicense

cur_year = datetime.today().year
start_date_of_year = date(cur_year, 1, 1)


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
