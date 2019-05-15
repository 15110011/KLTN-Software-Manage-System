from googleapiclient.discovery import build
from oauth2client import file, client, tools
from google.oauth2 import service_account
from google_auth_oauthlib.flow import InstalledAppFlow
from httplib2 import Http
import argparse
import os
import base64

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class GmailService:
    CREDENTIALS_JSON_FILE = os.path.join(
        BASE_DIR, 'credentials.json')
    SCOPES = [
        'https://mail.google.com/',
        'https://www.googleapis.com/auth/gmail.modify',
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/pubsub'
    ]

    def __init__(self, credentials=CREDENTIALS_JSON_FILE, scopes=SCOPES):
        self.credentials = credentials
        self.scopes = scopes

    def get_service(self):
        store = file.Storage(os.path.join(
        BASE_DIR, 'inbox/token.json'))
        creds = store.get()
        if not creds or creds.invalid:
            flow = client.flow_from_clientsecrets(
                self.credentials, self.scopes)
            creds = tools.run_flow(flow, store)
        service = build('gmail', 'v1', http=creds.authorize(Http()))
        return service

    def get_all_messages(self, labelIds=None, query=None, maxResults=None, pageToken=None):
        service = self.get_service()
        results = service.users().messages().list(userId='me', labelIds=[
            labelIds], q=query, maxResults=maxResults, pageToken=pageToken).execute()
        messages = results.get('messages', [])
        nextPageToken = results.get('nextPageToken', None)
        return {"messages_id": messages, "nextPageToken": nextPageToken}

    def get_message(self, message_id):
        service = self.get_service()
        msg = service.users().messages().get(userId='me', id=message_id).execute()
        message = None
        if 'data' in msg['payload']['body']:
            message = msg['payload']['body']['data']
            message = base64.urlsafe_b64decode(message)
            message = str(message, 'utf-8')
        elif 'data' in msg['payload']['parts'][0]['body']:
            message = msg['payload']['parts'][0]['body']['data']
            message = base64.urlsafe_b64decode(message)
            message = str(message, 'utf-8')
        return {"message": message, "historyId": msg['historyId']}

    def watch_mail_box(self):
        service = self.get_service()
        request = {
            'labelsIds': ['INBOX', 'SENT'],
            'topicName': 'projects/theaqvteam/topics/mail-box'
        }
        return service.users().watch(userId='me', body=request).execute()

    def get_thread(self, thread_id):
        service = self.get_service()
        thread = service.users().threads().get(userId='me', id=thread_id).execute()
        messages_id = [msg['id'] for msg in thread['messages']]
        return {"messages_id": messages_id}

    def get_history(self, history_id, labelId=None, historyTypes=None, maxResults=None, pageToken=None):
        service = self.get_service()
        history = service.users().history().list(
            userId='me', startHistoryId=history_id, historyTypes=historyTypes,
            maxResults=maxResults, pageToken=pageToken, labelId=labelId).execute()
        data = []
        for messages in history['history']:
            for msg in messages['messages']:
                data.append(
                    {"message_id": msg['id'], "thread_id": msg['threadId']})

        return {"messages": data}
