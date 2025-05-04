// HealthRecommendations.jsx
import { AlertCircle, Droplets, Sun, Wind } from 'lucide-react';
import './HealthRecommendations.css';

const HealthRecommendations = ({ 
  uv, 
  aqi = 0, 
  precip = 0, 
  getUVPrecaution = (uvIndex) => {
    if (uvIndex === undefined || uvIndex === null) return "Data unavailable";
    if (uvIndex >= 11) return "Extreme risk - avoid sun";
    if (uvIndex >= 8) return "Very high risk - extra protection needed";
    if (uvIndex >= 6) return "High risk - protection required";
    if (uvIndex >= 3) return "Moderate risk - protection advised";
    return "Low risk - minimal protection needed";
  }, 
  getAQIMessage = (aqiValue) => {
    if (aqiValue >= 300) return "Hazardous";
    if (aqiValue >= 200) return "Very unhealthy";
    if (aqiValue >= 150) return "Unhealthy";
    if (aqiValue >= 100) return "Unhealthy for sensitive groups";
    if (aqiValue >= 50) return "Moderate";
    return "Good";
  }
}) => {
  // Determine severity levels for visual indicators
  const getUVSeverity = (uvIndex) => {
    if (uvIndex === undefined || uvIndex === null) return "unavailable";
    if (uvIndex >= 8) return "high-severity";
    if (uvIndex >= 6) return "medium-severity";
    if (uvIndex >= 3) return "low-severity";
    return "safe-severity";
  };
  
  const getAQISeverity = (aqiValue) => {
    if (aqiValue >= 150) return "high-severity";
    if (aqiValue >= 100) return "medium-severity";
    if (aqiValue >= 50) return "low-severity";
    return "safe-severity";
  };
  
  return (
    <div className="health-recommendations">
      <div className="health-recommendations-header">
        <h2 className="header-title">
          <AlertCircle className="header-icon" />
          <span>Health Advisory</span>
        </h2>
      </div>
      
      <div className="health-metrics">
        {/* UV Index Card */}
        <div className="metric-card">
          <div className="metric-header">
            <Sun className="metric-icon sun-icon" />
            <h3>UV Index</h3>
          </div>
          <div className="metric-content">
            <span className={`metric-value ${getUVSeverity(uv)}`}>{uv !== undefined && uv !== null ? uv : "—"}</span>
            <span className="metric-description">{getUVPrecaution(uv)}</span>
          </div>
        </div>
        
        {/* AQI Card */}
        <div className="metric-card">
          <div className="metric-header">
            <Wind className="metric-icon wind-icon" />
            <h3>Air Quality</h3>
          </div>
          <div className="metric-content">
            <span className={`metric-value ${getAQISeverity(aqi)}`}>{aqi.toFixed(1)}</span>
            <span className="metric-description">{getAQIMessage(aqi)}</span>
          </div>
        </div>
        
        {/* Precipitation Card */}
        <div className="metric-card">
          <div className="metric-header">
            <Droplets className="metric-icon droplets-icon" />
            <h3>Precipitation</h3>
          </div>
          <div className="metric-content">
            <span className="metric-value precip-value">{precip}</span>
            <span className="metric-unit">mm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecommendations;