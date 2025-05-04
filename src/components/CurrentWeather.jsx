import { useState } from 'react';
import './CurrentWeather.css';

const CurrentWeather = ({ weatherData: initialData, cityName: initialCity ,uvIndex }) => {
 
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
    <div className="page-container">
     
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
    </div>
  );
};

export default CurrentWeather;