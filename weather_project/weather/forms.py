from django import forms

class WeatherForm(forms.Form):
    location = forms.CharField(label="Enter location")
    start_date = forms.DateField(widget=forms.SelectDateWidget)
    end_date = forms.DateField(widget=forms.SelectDateWidget)
