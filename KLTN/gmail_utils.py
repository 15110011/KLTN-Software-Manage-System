import requests
import json
import base64
from email.mime.audio import MIMEAudio
from email.mime.base import MIMEBase
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import mimetypes
from pprint import pprint

CLIENTSECRETS_LOCATION = 'client_secret.json'
REDIRECT_URI = 'http://localhost:8000/api/v1/gmail/exchange'
SCOPES = [
    'https://mail.google.com/'
]


def exchange_code(request, authorization_code, id, secret):
    res = requests.post('https://oauth2.googleapis.com/token', {
        "code": authorization_code,
        "client_id": id,
        'client_secret': secret,
        "access_type": 'offline',
        "grant_type": 'authorization_code',
        "redirect_uri": 'postmessage',
    }).json()

    return res


def send_mail(request, ):

    message_text = request.data.get('text')
    to = request.data.get('to')
    sender = request.data.get('sender')
    subject = request.data.get('subject')

    message = MIMEText(message_text)
    message['to'] = to
    message['from'] = sender
    message['subject'] = subject

    access_token = request.session.get('access_token')
    raw = base64.urlsafe_b64encode(
        message.as_bytes()).decode()

    test = requests.get(
        'https://www.googleapis.com/gmail/v1/users/me/messages/labels'
    )
    print ('1234443534', test)

    res = requests.post(
        'https://www.googleapis.com/gmail/v1/users/me/messages/send', data=json.dumps({
            "raw": raw
        }), headers={"Authorization": f'Bearer {access_token}', "Content-Type": "application/json", "Accept": "application/json"})

    print(f'SENDING to {to}....')

    return res
