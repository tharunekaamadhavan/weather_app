import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './HourlyWeatherChart.css';

const HourlyWeatherChart = ({ hourlyData }) => {
  if (!hourlyData || hourlyData.length === 0) return null;

  // Format data
  const formattedData = hourlyData.map((hour) => ({
    time: hour.time.split(' ')[1], 
    temperature: hour.temp_c,
    precipitation: hour.precip_mm,
    windspeed: hour.wind_kph
  }));

  return (
    <div className="chart-wrapper">
      <h3 className="chart-title">Hourly Weather</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={formattedData}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} hide />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#ff7300" name="Temp (°C)" activeDot={{ r: 8 }} />
          <Line yAxisId="right" type="monotone" dataKey="precipitation" stroke="#007aff" name="Precip (mm)" />
          <Line yAxisId="right" type="monotone" dataKey="windspeed" stroke="#00c49f" name="Wind (kph)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HourlyWeatherChart;
