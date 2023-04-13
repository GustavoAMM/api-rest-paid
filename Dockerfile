FROM python:3.11.2-slim

WORKDIR /paid
COPY servicios ./servicios
COPY logica ./logica

RUN apt-get update
RUN apt-get install -y gcc
RUN apt-get install -y default-libmysqlclient-dev

RUN pip install --upgrade pip
RUN pip install -r ./servicios/requirements.txt
RUN pip install --upgrade sqlalchemy
# ENV PYTHONPATH=/paid
ENV PYTHONPATH="$PYTHONPATH:/paid"

EXPOSE 8000
CMD ["python", "./servicios/manage.py", "runserver", "0.0.0.0:8000"]