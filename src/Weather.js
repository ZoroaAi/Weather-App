import React, { useState } from 'react';

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  console.log(process.env.API_KEY);

  const fetchWeather = async () => {
    const api_key = "043c8a285ac385e52e215dca7ffbcca0";
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    console.log('URL:', url);
    try {
        const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  }

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter city name:
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <button type="submit">Get Weather</button>
      </form>
      {weather && weather.main && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} K</p>
          <p>Humidity: {weather.main.humidity}</p>
          <p>Weather: {weather.weather[0].main}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
