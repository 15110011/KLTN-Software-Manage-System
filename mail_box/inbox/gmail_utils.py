from googleapiclient.discovery import build
from oauth2client import file, client, tools
from google.oauth2 import service_account
from google_auth_oauthlib.flow import InstalledAppFlow
from httplib2 import Http
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CREDENTIALS_JSON_FILE = os.path.join(BASE_DIR, 'credentials.json')
SCOPES = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.readonly',
    # 'https://www.googleapis.com/auth/gmail.metadata'
]

# credentials = service_account.Credentials.from_service_account_file(
#     CREDENTIALS_JSON_FILE, scopes=SCOPES)
# service = build('gmail', 'v1', credentials=credentials)

def get_service():
  store = file.Storage('token.json')
  creds = store.get()
  if not creds or creds.invalid:
    flow = client.flow_from_clientsecrets(CREDENTIALS_JSON_FILE, SCOPES)
    creds = tools.run_flow(flow, store)
  service = build('gmail', 'v1', http=creds.authorize(Http()))
  results = service.users().messages().list(userId='me', labelIds = ['INBOX']).execute()
  messages = results.get('messages', [])
  for message in messages:
    msg = service.users().messages().get(userId='me', id=message['id']).execute()
    print (msg['snippet'])
  return results

get_service()