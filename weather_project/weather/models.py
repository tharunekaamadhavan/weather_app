from mongoengine import Document, StringField, DateTimeField, FloatField, ListField,DictField

class Weather(Document):
    location = StringField(required=True)
    latitude = FloatField(required=False)
    longitude = FloatField(required=False)
    start_date = DateTimeField(required=True)
    end_date = DateTimeField(required=True)
    weather_details = DictField()
    created_at = DateTimeField()
    updated_at = DateTimeField()
