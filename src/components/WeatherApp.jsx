import { useState } from 'react';
import './WeatherApp.css';

const CurrentWeather = ({ weatherData: initialData, cityName: initialCity, uvIndex }) => {
  const [weatherData] = useState(initialData || {
    condition: {
      text: "Partly cloudy",
      icon: "/api/placeholder/64/64"
    },
    temp_c: 24,
    wind_kph: 15,
    humidity: 65,
    feelslike_c: 23,
    uv: 6
  });
  
  const [cityName] = useState(initialCity || "New York");

  const formatDate = () => {
    const now = new Date();
    const options = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    };
    return now.toLocaleDateString('en-US', options);
  };

  const getUvProgress = (uv) => {
    const uvIndex = uv || 0;
    return Math.min(Math.max((uvIndex / 11) * 100, 10), 100);
  };

  return (
    <div className="weather-container">
      <div className="weather-card">
        <div className="temperature-section">
          <div className="location-info">
            <h2>{cityName}</h2>
            <p>{formatDate()}</p>
          </div>

          <img 
            src={weatherData.condition.icon} 
            alt="weather icon" 
            className="weather-icon-large"
          />

          <div className="temp-display">
            <div className="temp-main">{weatherData.temp_c}</div>
            <div className="temp-unit">°C</div>
          </div>
          <div className="weather-description">
            <span className="weather-status-icon">🌤️</span>
            <p className="temp-condition">{weatherData.condition.text}</p>
          </div>
          <div className="temp-range">
            <span>
              <i>⬆️</i>
              {weatherData.maxtemp_c || (weatherData.temp_c + 2)}°
            </span>
            <span>
              <i>⬇️</i>
              {weatherData.mintemp_c || (weatherData.temp_c - 2)}°
            </span>
            <span>
              <i>👤</i>
              Feels like {weatherData.feelslike_c || weatherData.temp_c}°
            </span>
          </div>
        </div>

        <div className="weather-details">
          <div className="details-grid">
            <div className="detail-card">
              <div className="detail-icon">💨</div>
              <div className="detail-value">{weatherData.wind_kph} km/h</div>
              <div className="detail-label">Wind Speed</div>
            </div>

            <div className="detail-card">
              <div className="detail-icon">💧</div>
              <div className="detail-value">{weatherData.humidity}%</div>
              <div className="detail-label">Humidity</div>
            </div>

            <div className="detail-card">
              <div className="detail-icon">🌡️</div>
              <div className="detail-value">{weatherData.feelslike_c || weatherData.temp_c}°</div>
              <div className="detail-label">Feels Like</div>
            </div>

            <div className="detail-card">
              <div className="detail-icon">☀️</div>
              <div className="detail-value">
                {typeof uvIndex === 'number' ? uvIndex : "N/A"}
              </div>
              <div className="detail-label">UV Index</div>
              <div className="progress-container">
                <div 
                  className="progress-bar" 
                  style={{ width: `${getUvProgress(uvIndex)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WeeklyForecast = ({ forecastData }) => {
  const [weeklyData] = useState(forecastData || [
    { day: "Sat", high: 39, low: 28, icon: "🌦️", precip: 2, wind: 15 },
    { day: "Sun", high: 39, low: 28, icon: "☁️", precip: 0, wind: 12 },
    { day: "Mon", high: 38, low: 28, icon: "🌧️", precip: 5, wind: 18 },
    { day: "Tue", high: 38, low: 28, icon: "🌧️", precip: 4, wind: 20 },
    { day: "Wed", high: 37, low: 28, icon: "🌧️", precip: 3, wind: 16 },
    { day: "Thu", high: 38, low: 28, icon: "🌧️", precip: 2, wind: 14 },
    { day: "Fri", high: 38, low: 28, icon: "🌦️", precip: 1, wind: 13 },
    { day: "Sat", high: 38, low: 28, icon: "🌦️", precip: 1, wind: 15 },
  ]);

  const [selectedMetric, setSelectedMetric] = useState('temperature');

  const getGraphHeight = (value, metric) => {
    if (metric === 'temperature') {
      return (value - 25) * 3; // Scale temperature for graph
    } else if (metric === 'precipitation') {
      return value * 10; // Scale precipitation (mm) for graph
    } else if (metric === 'wind') {
      return value * 2; // Scale wind speed (km/h) for graph
    }
    return 0;
  };

  const getGraphValue = (day, metric) => {
    if (metric === 'temperature') return day.high;
    if (metric === 'precipitation') return day.precip;
    if (metric === 'wind') return day.wind;
    return 0;
  };

  const getGraphColor = (metric) => {
    if (metric === 'temperature') return '#d4af37';
    if (metric === 'precipitation') return '#00f';
    if (metric === 'wind') return '#0ff';
    return '#d4af37';
  };

  const getGraphUnit = (metric) => {
    if (metric === 'temperature') return '°C';
    if (metric === 'precipitation') return 'mm';
    if (metric === 'wind') return 'km/h';
    return '';
  };

  return (
    <div className="weekly-forecast">
      <div className="metric-selector">
        <button 
          className={selectedMetric === 'temperature' ? 'active' : ''} 
          onClick={() => setSelectedMetric('temperature')}
        >
          Temperature
        </button>
        <button 
          className={selectedMetric === 'precipitation' ? 'active' : ''} 
          onClick={() => setSelectedMetric('precipitation')}
        >
          Precipitation
        </button>
        <button 
          className={selectedMetric === 'wind' ? 'active' : ''} 
          onClick={() => setSelectedMetric('wind')}
        >
          Wind
        </button>
      </div>
      <div className="forecast-graph">
        <div className="graph-line">
          {weeklyData.map((day, index) => (
            <div 
              key={index} 
              className="graph-point" 
              style={{ 
                height: `${getGraphHeight(getGraphValue(day, selectedMetric), selectedMetric)}px`,
                backgroundColor: getGraphColor(selectedMetric)
              }}
            >
              <span className="temp-label">
                {getGraphValue(day, selectedMetric)}{getGraphUnit(selectedMetric)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="forecast-days">
        {weeklyData.map((day, index) => (
          <div key={index} className="forecast-day">
            <div className="day-label">{day.day}</div>
            <div className="day-icon">{day.icon}</div>
            <div className="day-temps">
              <span className="high-temp">{day.high}°</span>
              <span className="low-temp">{day.low}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WeatherApp = ({ weatherData, cityName, uvIndex, forecastData }) => {
  return (
    <div className="app-container">
      <CurrentWeather weatherData={weatherData} cityName={cityName} uvIndex={uvIndex} />
      <WeeklyForecast forecastData={forecastData} />
    </div>
  );
};

export default WeatherApp;