from googleapiclient.discovery import build
from oauth2client import file, client, tools
from google.oauth2 import service_account
from google_auth_oauthlib.flow import InstalledAppFlow
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CREDENTIALS_JSON_FILE = os.path.join(BASE_DIR, 'credentials.json')
SCOPES = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.metadata'
]

# credentials = service_account.Credentials.from_service_account_file(
#     CREDENTIALS_JSON_FILE, scopes=SCOPES)
# service = build('gmail', 'v1', credentials=credentials)

def get_service():
  flow = InstalledAppFlow.from_client_secrets_file(
                CREDENTIALS_JSON_FILE, SCOPES)
  creds = flow.run_local_server()
  service = build('gmail', 'v1', credentials=creds)
  results = service.users().messages().list(userId='me', q='').execute()
  print (results)
  return results

get_service()