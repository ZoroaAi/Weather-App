import React, { useState } from 'react';
import './css/Weather.scss';

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const fetchWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeather(data);
      setShowDetails(true);
    } catch (error) {
      setError(error.message);
    }
  }

  const WeatherDetails = () => {
    if (weather && weather.main) {
      return (
        <div class="display-wrapper">
          <div className={`display-weather ${showDetails ? 'slide-right' : ''}`}>
            <h2 className='display-name'>{weather.name}</h2>
            <p className='display-temp'>Temperature: {toCelsius(weather.main.temp)} &#8451;</p>
            <p className='display-humidity'>Humidity: {weather.main.humidity}</p>
            <p className='display-weather-type'>Weather: {weather.weather[0].main}</p>
          </div>
        </div>
      );
    }
    return null;
  }

  const toCelsius = (temp) => {
    return (temp - 273.15).toFixed(2);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  }

  return (
    <div className="page-wrapper">
      <div className='weather-wrapper'>
        <div className={`weather-form`}>
          <h1>Weather App</h1>
          <form onSubmit={handleSubmit}>
            <label>Enter City Name: </label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            <button type="submit">Get Weather</button>
          </form>
        </div>
        {error && <p>{error}</p>}
      </div>
      <WeatherDetails/>
    </div>
  );
}

export default Weather;
