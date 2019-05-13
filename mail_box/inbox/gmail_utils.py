from googleapiclient.discovery import build
from oauth2client import file, client, tools
from google.oauth2 import service_account
from google_auth_oauthlib.flow import InstalledAppFlow
from httplib2 import Http
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class GmailService:
    CREDENTIALS_JSON_FILE = os.path.join(BASE_DIR, 'credentials.json')
    SCOPES = [
        'https://mail.google.com/',
        'https://www.googleapis.com/auth/gmail.modify',
        'https://www.googleapis.com/auth/gmail.readonly',
    ]

    def __init__(self, credentials=CREDENTIALS_JSON_FILE, scopes=SCOPES):
        self.credentials = credentials
        self.scopes = scopes

    def get_service(self):
        store = file.Storage('token.json')
        creds = store.get()
        if not creds or creds.invalid:
            flow = client.flow_from_clientsecrets(
                self.credentials, self.scopes)
            creds = tools.run_flow(flow, store)
        service = build('gmail', 'v1', http=creds.authorize(Http()))
        return service

    def get_all_messages(self, q=None, maxResults=None, pageToken=None):
        service = self.get_service()
        results = service.users().messages().list(userId='me', labelIds=[
            'INBOX'], q=q, maxResults=maxResults, pageToken=pageToken).execute()
        messages = results.get('messages', [])
        nextPageToken = results.get('nextPageToken', None)
        email_contents = []
        for message in messages:
            msg = self.get_message(message['id'])
            email_contents.append(msg)
        email_contents.append({"pageToken": nextPageToken})
        return email_contents
    
    def get_message(self, message_id):
      service = self.get_service()
      msg = service.users().messages().get(userId='me', id=message_id).execute()
      print (msg['payload']['body'])
      return msg['snippet']


gmail = GmailService()
print(gmail.get_all_messages())
