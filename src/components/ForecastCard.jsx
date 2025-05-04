import React from 'react';
import './ForecastCard.css';

const ForecastCard = ({ forecast, getUVPrecaution }) => {
  
  const formatDate = (dateStr) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  
  const isToday = (dateStr) => {
    const today = new Date().toISOString().split('T')[0];
    return dateStr === today;
  };

  return (
    <div className="forecast-container">
      <h3 className="forecast-header">5-Day Forecast</h3>
      
      <div className="forecast-grid">
        {forecast.map((day, index) => (
          <div 
            key={index} 
            className={`forecast-card ${isToday(day.date) ? 'today' : ''}`}
          >
            <p className="forecast-date">{formatDate(day.date)}</p>
            <img 
              src={day.day.condition.icon} 
              alt={day.day.condition.text} 
              className="forecast-icon" 
            />
            <p className="forecast-condition">{day.day.condition.text}</p>
            
            <p className="forecast-temp">
              {day.day.mintemp_c}°C - {day.day.maxtemp_c}°C
            </p>
            
            <div className="forecast-detail">
              <span className="detail-label">Rain Chance:</span>
              <span className="detail-value">{day.day.daily_chance_of_rain}%</span>
            </div>
            
            <div className="forecast-detail">
              <span className="detail-label">Precipitation:</span>
              <span className="detail-value">{day.day.totalprecip_mm} mm</span>
            </div>
            
            <div className="forecast-detail">
              <span className="detail-label">UV Index:</span>
              <span className="detail-value">{day.day.uv}</span>
            </div>
            
            <div className="uv-tip">
              {getUVPrecaution(day.day.uv)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;