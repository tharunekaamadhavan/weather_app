import datetime
import os
import requests
import csv
import xml.etree.ElementTree as ET

from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse, HttpResponse
from .forms import WeatherForm
from .models import Weather

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import WeatherSerializer

from decouple import config
# Load from environment variable (recommended)
WEATHER_API_KEY = config("WEATHERAPI_KEY")


# Home view
def home(request):
    return HttpResponse("Welcome to the Weather App!")

from django.http import JsonResponse
from .models import Weather
from datetime import datetime,timedelta
import requests
# weather/views.py
from django.http import JsonResponse
from .models import Weather
from datetime import datetime
import requests
import json


API_KEY = '459ac5cfa3d84d128b7160812250205'


def fetch_weather_data(location, start_date, end_date):
    url = "https://api.openweathermap.org/data/2.5/onecall/timemachine"
    weather_data = []
    
    
    current_date = start_date
    while current_date <= end_date:
        timestamp = int(current_date.timestamp())  

        params = {
            'lat': 35.6895,  
            'lon': 139.6917,  
            'dt': timestamp,  
            'appid': API_KEY, 
            'units': 'metric' 
        }

        response = requests.get(url, params=params)

        if response.status_code == 200:
            data = response.json()
            if 'current' in data:
                weather_data.append({
                    'temperature': data['current']['temp'],
                    'humidity': data['current']['humidity'],
                    'weather_description': data['current']['weather'][0]['description'],
                    'timestamp': datetime.fromtimestamp(data['current']['dt']),
                })
        else:
            print(f"Error fetching data for {current_date}: {response.status_code}")

        current_date += timedelta(days=1)

    return weather_data

def create_weather(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            location = data['location']
            start_date = datetime.strptime(data['start_date'], "%Y-%m-%d")
            end_date = datetime.strptime(data['end_date'], "%Y-%m-%d")

            
            weather_data = fetch_weather_data(location, start_date, end_date)
            
            if weather_data:
                
                for item in weather_data:
                    Weather.objects.create(
                        location=location,
                        start_date=start_date,
                        end_date=end_date,
                        temperature=item['temperature'],
                        humidity=item['humidity'],
                        weather_description=item['weather_description'],
                        timestamp=item['timestamp'],
                    )
                return JsonResponse({"message": "Weather data saved successfully!"})
            else:
                return JsonResponse({"message": "No weather data available for the given dates."})
        except Exception as e:
            return JsonResponse({"message": f"Error: {str(e)}"}, status=400)

def create_weather(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  
            location = data['location']
            start_date = datetime.strptime(data['start_date'], "%Y-%m-%d")
            end_date = datetime.strptime(data['end_date'], "%Y-%m-%d")
            
           
            weather_data = fetch_weather_data(location, start_date, end_date)
            
            if weather_data:
                
                for item in weather_data:
                    Weather.objects.create(
                        location=location,
                        start_date=start_date,
                        end_date=end_date,
                        temperature=item['temperature'],
                        humidity=item['humidity'],
                        weather_description=item['weather_description'],
                        timestamp=item['timestamp'],
                    )
                return JsonResponse({"message": "Weather data saved successfully!"})
            else:
                return JsonResponse({"message": "No weather data available for the given dates."})
        except Exception as e:
            return JsonResponse({"message": f"Error: {str(e)}"}, status=400)



def read_weather(request, location):
    """Fetches weather data for a specific location."""
    weather_data = Weather.objects(location=location)
    
    data_list = []
    for data in weather_data:
        data_list.append({
            'location': data.location,
            'start_date': data.start_date,
            'end_date': data.end_date,
            'temperature': data.temperature,
            'humidity': data.humidity,
            'weather_description': data.weather_description,
            'timestamp': data.timestamp,
        })
    
    return JsonResponse({"weather_data": data_list})


# Update a record
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def update_weather(request, id):
    """Updates weather data."""
    if request.method == "PUT":
        new_data = request.POST
        weather_data = Weather.objects(id=id).first()
        
        if weather_data:
            weather_data.update(set__temperature=new_data.get('temperature'))
            weather_data.update(set__humidity=new_data.get('humidity'))
            weather_data.update(set__weather_description=new_data.get('weather_description'))
            weather_data.update(set__timestamp=datetime.now())
            
            return JsonResponse({"message": "Weather data updated successfully!"})
        else:
            return JsonResponse({"message": "Weather data not found."})


# Delete a record
@csrf_exempt
def delete_weather(request, id):
    """Deletes weather data."""
    if request.method == "DELETE":
        weather_data = Weather.objects(id=id).first()
        
        if weather_data:
            weather_data.delete()
            return JsonResponse({"message": "Weather data deleted successfully!"})
        else:
            return JsonResponse({"message": "Weather data not found."})


# Export as JSON
def export_json(request):
    data = list(Weather.objects.values())
    return JsonResponse(data, safe=False)


# Export as CSV
def export_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="weather_data.csv"'

    writer = csv.writer(response)
    writer.writerow(['ID', 'Location', 'Weather Details', 'Created At'])

    for record in Weather.objects.all():
        writer.writerow([record.id, record.location, record.weather_details, record.created_at])

    return response


# Export as XML
def export_xml(request):
    root = ET.Element("Weather")

    for record in Weather.objects.all():
        entry = ET.SubElement(root, "Record")
        ET.SubElement(entry, "ID").text = str(record.id)
        ET.SubElement(entry, "Location").text = record.location
        ET.SubElement(entry, "WeatherDetails").text = record.weather_details
        ET.SubElement(entry, "CreatedAt").text = record.created_at.isoformat()

    xml_data = ET.tostring(root, encoding='utf-8')
    response = HttpResponse(xml_data, content_type='application/xml')
    response['Content-Disposition'] = 'attachment; filename="weather_data.xml"'
    return response


# REST API for saving weather data
class WeatherDataView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = WeatherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Weather data saved successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

@csrf_exempt
def weather_data_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # Optionally, save data to DB here
            print("Received data:", data)
            return JsonResponse({"message": "Weather data received!"}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)
