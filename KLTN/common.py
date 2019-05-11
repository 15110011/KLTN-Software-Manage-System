from django.core.mail import send_mail
from KLTN import settings
import jwt

PRIORITY_CHOICES = ((0, 'Low'), (1, 'Medium'), (2, 'High'))
OPERATORS = ['Equal To', 'Not equal to', 'Greater than',
             'Less than', 'Greater than or equal to', 'Less than or equal to']
MARKETING_PLAN_CONDITIONS = {
    "1": {
        "id": '1',
        "name": 'State',
        'operators': ['Equal to', 'Not equal to'],
        'operand_type': ''
    },
    '2': {
        'id': '2',
        'name': 'Number of buying the same type',
        'operators': OPERATORS,
        'operand_type': ''
    },
    '3': {
        'id': '3',
        'name': 'Number of buying the same category',
        'operators': OPERATORS,
        'operand_category': ''
    }
}

NOTE_CHOICES = (('DEFAULT', 'Default'), ('MARKETING', 'Marketing'), ('FOLLOWUP', 'Follow up'))


def send_email(user, mail_subject, message):
    print ('sdfjisdjfisdf', user.email)
    return send_mail(mail_subject, message,
              settings.EMAIL_HOST_USER, [user.email])
