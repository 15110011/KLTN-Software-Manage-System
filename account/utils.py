from django.core.mail import send_mail
from KLTN import settings
import jwt

def send_email_register(user):
    payloads = {"id": user.id, "is_active": user.is_active}
    activate_token = jwt.encode(
        payloads, settings.SECRET_KEY, algorithm='HS256')
    mail_subject = 'Activate your AQV Management System account.'
    message = f"Please click this link below to activate your account http://localhost:8000/api/v1/activate?activate_token={activate_token}"
    send_mail(mail_subject, message,
              settings.EMAIL_HOST_USER, [user.email])
