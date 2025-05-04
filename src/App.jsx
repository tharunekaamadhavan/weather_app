import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HealthRecommendations from './components/HealthRecommendations';
import ForecastCard from './components/ForecastCard';
import HourlyWeatherChart from './components/HourlyWeatherChart';
import './App.css';

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [extraData, setExtraData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [geolocError, setGeolocError] = useState('');

  const fetchWeather = async (searchLocation) => {
    const locationToSearch = searchLocation || location;

    if (!locationToSearch.trim()) return;

    try {
      setLoading(true);
      setError('');
      setGeolocError('');
      setWeatherData(null);
      setForecast([]);
      setHourlyData([]);
      setExtraData(null);

      const res = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
        params: {
          key: '459ac5cfa3d84d128b7160812250205',
          q: locationToSearch,
          days: 5,
          aqi: 'yes',
          alerts: 'no'
        },
      });
      
      const data = res.data;
      console.log('Weather API Response:', data);

      setWeatherData(data.current);
      setForecast(data.forecast.forecastday);

      if (data.forecast.forecastday.length > 0) {
        setHourlyData(data.forecast.forecastday[0].hour);
      }

      setExtraData({
        cityName: data.location.name,
        uvIndex: data.forecast.forecastday[0].day.uv,
        aqi: data.current.air_quality.pm2_5,
        precipitation: data.forecast.forecastday[0].day.totalprecip_mm,
      });
//  Django backend
await axios.post('http://localhost:8000/weather/', {
  location: data.location.name,
  latitude: data.location.lat,
  longitude: data.location.lon,
  start_date: new Date(data.location.localtime).toISOString().split('T')[0],
  end_date: new Date(data.location.localtime).toISOString().split('T')[0],  
  weather_info: data
});
    } catch (err) {
      console.error(err);
      setError('');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchWeather();
  };

  useEffect(() => {
    const getCurrentLocationWeather = () => {
      setLoading(true);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const locationString = `${latitude},${longitude}`;
            fetchWeather(locationString);
          },
          (err) => {
            console.error("Geolocation error:", err);
            setGeolocError("Unable to get your current location. Please allow location access or search manually.");
            setLoading(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        setGeolocError("Geolocation is not supported by your browser. Please search for a location manually.");
        setLoading(false);
      }
    };

    getCurrentLocationWeather();
  }, []);

  const getUVPrecaution = (uv) => {
    if (uv === null || uv === undefined) return 'UV index data not available.';
    if (uv < 3) return 'Low risk. Enjoy your day!';
    if (uv < 6) return 'Moderate risk. Wear sunglasses.';
    if (uv < 8) return 'High risk. Use SPF 30+ sunscreen.';
    return 'Very high risk! Avoid direct sunlight.';
  };

  const getAQIMessage = (pm25) => {
    if (pm25 <= 12) return 'Good air quality.';
    if (pm25 <= 35.4) return 'Moderate air quality.';
    if (pm25 <= 55.4) return 'Unhealthy for sensitive groups.';
    if (pm25 <= 150.4) return 'Unhealthy.';
    return 'Very unhealthy. Stay indoors.';
  };
  console.log('Hourly data:', hourlyData);

  return (
    <div id="root">
      <Navbar />
      <div className="app-container">
        <div className="main-content">
          <h1 className="app-title">WeatherWise</h1>
<h2 className="sub">Make sure to let us know your location!</h2>
          <SearchBar location={location} setLocation={setLocation} fetchWeather={handleSearch} />

          {geolocError && <p className="geoloc-error">{geolocError}</p>}
          {error && <p className="error-message">{error}</p>}

          {loading && (
            <div className="loading">
              <div className="loader"></div>
            </div>
          )}

{weatherData && (
  <div className="weather-info-container">
    {extraData && <h2 className="location-title">Weather in {extraData.cityName}</h2>}

    <div className="weather-display-grid">
      <div className="current-weather-section">
        <CurrentWeather weatherData={weatherData} cityName={extraData?.cityName} uvIndex={extraData?.uvIndex}/>
      </div>
    </div>

    <h3>Hourly Weather Forecast</h3>
{hourlyData.length > 0 && <HourlyWeatherChart hourlyData={hourlyData} />}

  </div>
)}


          {extraData && (
            <HealthRecommendations
              uv={extraData.uvIndex}
              aqi={extraData.aqi}
              precip={extraData.precipitation}
              getUVPrecaution={getUVPrecaution}
              getAQIMessage={getAQIMessage}
            />
          )}

          {forecast.length > 0 && (
            <ForecastCard forecast={forecast} getUVPrecaution={getUVPrecaution} />
          )}

          <footer className="footer">
            Built by Tharunekaa Madhavan | Powered by WeatherAPI | PM Accelerator
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
