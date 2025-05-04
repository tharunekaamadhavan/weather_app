from rest_framework import serializers
from .models import Weather

class WeatherRecordSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    location = serializers.CharField()
    temperature = serializers.FloatField()
    date = serializers.DateTimeField()
    description = serializers.CharField(allow_blank=True)
    humidity = serializers.FloatField()
    wind_speed = serializers.FloatField()
    extra_data = serializers.CharField(allow_blank=True)

    def create(self, validated_data):
        return Weather(**validated_data).save()

    def update(self, instance, validated_data):
        for field in validated_data:
            setattr(instance, field, validated_data[field])
        instance.save()
        return instance
from rest_framework import serializers
from .models import Weather

class WeatherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weather
        fields = ['location', 'latitude', 'longitude', 'start_date', 'end_date', 'weather_info']
