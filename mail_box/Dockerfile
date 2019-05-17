
FROM python:3.7.0
ENV PYTHONUNBUFFERED=1
RUN pip install pipenv
RUN mkdir /codebase
ADD . /codebase/
WORKDIR /codebase
RUN pipenv install --skip-lock
RUN pipenv install psycopg2-binary --skip-lock
CMD pipenv run python manage.py runserver 0.0.0.0:8001