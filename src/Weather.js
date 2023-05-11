import React, { useState } from 'react';

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    // const api_key = "043c8a285ac385e52e215dca7ffbcca0";
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`;
    try {
        const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message);
    }
  }
  
  const toCelsius = (temp) => {
    return (temp - 273.15).toFixed(2);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  }

  return (
    <div className='weather-wrapper'>
      <div class="weather-form">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <label>Enter City Name: </label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          <button type="submit">Get Weather</button>
        </form>
      </div>
      {weather && weather.main && (
        <div className='display-weather'>
          <h2 className='display-name'>{weather.name}</h2>
          <p className='display-temp'>Temperature: {toCelsius(weather.main.temp)} &#8451;</p>
          <p className='display-humidity'>Humidity: {weather.main.humidity}</p>
          <p className='display-weather-type'>Weather: {weather.weather[0].main}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Weather;
