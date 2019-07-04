from django.core.mail import send_mail
from KLTN import settings
import jwt
import requests

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

NOTE_CHOICES = (('DEFAULT', 'Default'), ('MARKETING',
                                         'Marketing'), ('FOLLOWUP', 'Follow up'))


def send_email(user, mail_subject, message):
    return send_mail(mail_subject, message,
                     settings.EMAIL_HOST_USER, [user.email])


def send_email_api(user, to_address, from_address, subject, message):
    data = json.dumps({"data": {"user_id": user.id, "to": to_address, "from": from_address,
                                "subject": subject, "message": message}})
    request = requests.post('http://emails:8001/api/v1/send-email',
                            data=data, headers={'Content-Type': 'application/json'})
    res = request.json()
   