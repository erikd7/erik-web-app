# syntax=docker/dockerfile:1

FROM python:3.8-slim-buster

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

#ENV UWSGI_CHEAPER 0
#ENV UWSGI_PROCESSES 1

COPY . .

#CMD ["python", "app.py"]

EXPOSE 49155:49155
ENTRYPOINT ["python3"]
CMD ["app.py"]