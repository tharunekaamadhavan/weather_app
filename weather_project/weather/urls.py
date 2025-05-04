from django.urls import path
from . import views
from .views import WeatherDataView
urlpatterns = [
    path('create/', views.create_weather, name='create_weather'),
    path('read/', views.read_weather, name='read_weather'),
    path('update/<str:id>/', views.update_weather, name='update_weather'),
    path('delete/<str:id>/', views.delete_weather, name='delete_weather'),
   
   
path('export/json/', views.export_json, name='export_json'),
path('export/csv/', views.export_csv, name='export_csv'),
path('export/xml/', views.export_xml, name='export_xml'),
path('weather/', WeatherDataView.as_view(), name='weather_data'),


]
