# Weather Dashboard

A modern weather dashboard application that fetches real-time weather data from OpenWeatherMap API.

## Features

- 🌤️ **Real-time Weather Data**: Current conditions, forecasts, and alerts
- 🗺️ **Multiple Locations**: Search and save weather for multiple cities
- 📊 **Detailed Metrics**: Temperature, humidity, wind speed, UV index, air quality
- 📈 **7-Day Forecast**: Extended weather forecast with visualizations
- 🌙 **Dark Mode**: Beautiful dark and light themes
- 📍 **Geolocation**: Auto-detect user location
- ⭐ **Favorites**: Save favorite locations for quick access
- 🔄 **Real-time Updates**: Auto-refresh weather data
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **API**: OpenWeatherMap API
- **Caching**: Node-cache for performance

### Frontend
- **Library**: React
- **Styling**: CSS3, Tailwind CSS
- **Charts**: Chart.js, React-Chartjs-2
- **HTTP Client**: Axios
- **Icons**: React-Icons

## Getting Started

### Prerequisites
- Node.js v14+
- npm or yarn
- OpenWeatherMap API key (free at https://openweathermap.org/api)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file in the root directory:
   ```
   PORT=5000
   NODE_ENV=development
   OPENWEATHER_API_KEY=your_api_key_here
   OPENWEATHER_BASE_URL=https://api.openweathermap.org
   ```

4. Create `frontend/.env`:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. Start the application:
   ```bash
   # Terminal 1 - Backend
   npm start

   # Terminal 2 - Frontend
   npm run client
   ```

6. Open `http://localhost:3000` in your browser

## API Endpoints

### Weather Endpoints

- `GET /api/weather/current?city=London` - Get current weather for a city
- `GET /api/weather/forecast?city=London` - Get 7-day forecast
- `GET /api/weather/geolocation` - Get weather for user's current location
- `GET /api/weather/air-quality?lat=51.5&lon=-0.1` - Get air quality data
- `GET /api/weather/favorites` - Get saved favorite locations
- `POST /api/weather/favorites` - Add a favorite location
- `DELETE /api/weather/favorites/:city` - Remove from favorites

## Project Structure

```
weather-dashboard/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── weather.js
│   ├── controllers/
│   │   └── weatherController.js
│   ├── services/
│   │   └── weatherService.js
│   └── middleware/
│       └── errorHandler.js
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Forecast.js
│   │   │   └── Settings.js
│   │   ├── components/
│   │   │   ├── CurrentWeather.js
│   │   │   ├── HourlyForecast.js
│   │   │   ├── DetailedMetrics.js
│   │   │   ├── SearchBar.js
│   │   │   └── FavoritesList.js
│   │   ├── services/
│   │   │   └── api.js
│   │   └── styles/
│   │       └── App.css
│   └── package.json
├── docs/
│   ├── API.md
│   └── SETUP.md
└── .env.example
```

## Weather Data Provided

- **Current Conditions**: Temperature, "feels like", humidity, pressure, visibility
- **Conditions**: Cloud coverage, precipitation
- **Wind**: Speed, direction, gusts
- **Sun**: Sunrise, sunset times
- **UV Index**: Sun exposure risk
- **Air Quality**: Pollutants (PM2.5, PM10, O3, NO2, SO2, CO)
- **Alerts**: Weather warnings and alerts

## Usage Examples

### Search for Weather
1. Enter city name in search bar
2. View current conditions and detailed metrics
3. See 7-day forecast with charts

### Add to Favorites
1. Click the star icon on any city
2. Access favorites from sidebar
3. Quick access to frequently checked locations

### View Forecast
1. Click "7-Day Forecast" tab
2. See weather predictions with charts
3. View hourly breakdown

## API Keys

Get your free API key at: https://openweathermap.org/api

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
