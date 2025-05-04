# 🌦️ Weather Forecast App – Frontend

This is a fully responsive **Weather Forecast Web Application** built using **React.js** with Vite. It provides real-time weather data, forecasts, and basic weather details based on user-inputted locations.

## ✨ Features (Frontend Only)

- 🌍 Search weather by location
- 📅 5-day forecast displayed in a scrollable or grid layout (based on device width)
- 🌡️ Detailed weather info: temperature, condition, humidity, wind, pressure
- 🌞 UV index and air quality display
- 📱 Responsive design for all screen sizes
- 📂 Export buttons (JSON, CSV, XML, PDF, Markdown) *(UI only – not functional yet)*
- 🗺️ Google Maps placeholder (UI only)
- 📺 YouTube video section planned (not integrated)
- 🧭 **Static Navbar** (non-functional for now)

## 🔧 Technologies Used

- **Frontend Framework**: React.js (Vite)
- **API Source**: [WeatherAPI](https://www.weatherapi.com/)
- **CSS**: Custom CSS with media queries (no Tailwind or frameworks used)
- **Icons**: Weather icons loaded from API or local assets

## 🧪 How to Run Locally

```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

## ❌ Backend Status

> I initially planned to build a backend using **Django** with **MongoDB** (via MongoEngine) to enable persistent storage, YouTube integration, and data exports.  
> However, due to time constraints, the backend is **incomplete** and currently non-functional.  
> **All functionalities you see now are handled on the frontend only** with live data fetched from WeatherAPI.

## 📦 Weather API Usage

- **Base URL**: `https://api.weatherapi.com/v1/`
- Endpoints used:
  - `/current.json` – for current weather
  - `/forecast.json` – for 5-day forecasts
- API key is stored securely via environment variables (`.env`)

## 📁 Project Structure

```
├── public/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── ForecastCard.jsx
│   │   └── ...
│   ├── App.jsx
│   ├── main.jsx
│   └── styles/
├── .env (not included)
└── README.md
```

## 📌 Planned Enhancements

- [ ] Complete backend with Django + MongoDB
- [ ] Functional export buttons for JSON, CSV, XML, etc.
- [ ] Integrate Google Maps and YouTube API
- [ ] Add authentication and user profiles
- [ ] Make navbar dynamic and interactive

## 🙏 Acknowledgements

- [WeatherAPI](https://www.weatherapi.com/)
- Weather icons from open weather sets and WeatherAPI

---

**Built with React.js and custom CSS. Still a work in progress.**# Weather Forecast App – Frontend

This is a fully responsive **Weather Forecast Web Application** built using **React.js** with Vite. It provides real-time weather data, forecasts, and basic weather details based on user-inputted locations.

## Features (Frontend Only)

### Core Features

- Search weather by location
- 5-day forecast displayed in a scrollable or grid layout (based on device width)
- Detailed weather info: temperature, condition, humidity, wind, pressure
- UV index and air quality display

### UI Features

- Responsive design for all screen sizes
- Export buttons (JSON, CSV, XML, PDF, Markdown) *(UI only – not functional yet)*
- Google Maps placeholder (UI only)
- YouTube video section planned (not integrated)
- **Static Navbar** (non-functional for now)

## Technologies Used

- **Frontend Framework**: React.js (Vite)
- **API Source**: [WeatherAPI](https://www.weatherapi.com/)
- **CSS**: Custom CSS with media queries (no Tailwind or frameworks used)
- **Icons**: Weather icons loaded from API or local assets

## How to Run Locally

```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Backend Status

> I initially planned to build a backend using **Django** with **MongoDB** (via MongoEngine) to enable persistent storage, YouTube integration, and data exports.  
> However, due to time constraints, the backend is **incomplete** and currently non-functional.  
> **All functionalities you see now are handled on the frontend only** with live data fetched from WeatherAPI.

## Weather API Usage

- **Base URL**: `https://api.weatherapi.com/v1/`
- Endpoints used:
  - `/current.json` – for current weather
  - `/forecast.json` – for 5-day forecasts
- API key is stored securely via environment variables (`.env`)

## Project Structure

```bash
├── public/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── ForecastCard.jsx
│   │   └── ...
│   ├── App.jsx
│   ├── main.jsx
│   └── styles/
├── .env (not included)
└── README.md
```

## Planned Enhancements

- [ ] Complete backend with Django + MongoDB
- [ ] Functional export buttons for JSON, CSV, XML, etc.
- [ ] Integrate Google Maps and YouTube API
- [ ] Add authentication and user profiles
- [ ] Make navbar dynamic and interactive

## Acknowledgements

- [WeatherAPI](https://www.weatherapi.com/)
- Weather icons from open weather sets and WeatherAPI

---

**Built with React.js and custom CSS. Still a work in progress.**