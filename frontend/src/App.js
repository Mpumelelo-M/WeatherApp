import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import { FaSun, FaCloudRain, FaSnowflake } from 'react-icons/fa';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    setError('');
    setWeather(null);

    try {
      const apiKey = '68f9b1795642cbc8eba55d3a384c9d71'; 
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather({
        temp: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        wind: data.wind.speed,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };
  const getBackground = () => {
    if (!weather) return 'sunny-background';
    switch (weather.condition.toLowerCase()) {
      case 'clear':
        return 'clear-sky';
      case 'clouds':
        return 'cloudy-background';
      case 'rain':
        return 'rainy-background';
      default:
        return 'default-background';
    }
  };

  const getWeatherIcon = () => {
    if (!weather) return null;
    switch (weather.condition.toLowerCase()) {
      case 'clear':
        return <FaSun style={{ color: 'yellow', fontSize: '2rem' }} />;
      case 'clouds':
        return <FaCloudRain style={{ color: 'gray', fontSize: '2rem' }} />;
      case 'rain':
        return <FaCloudRain style={{ color: 'blue', fontSize: '2rem' }} />;
      case 'snow':
        return <FaSnowflake style={{ color: 'lightblue', fontSize: '2rem' }} />;
      default:
        return null;
    }
  };

  return (
    <div className="App sunny-background">
      <h1>Weather</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{ backgroundColor: '#87CEEB', border: '1px solid grey', borderRadius: '50px'}}
        />
        <button onClick={fetchWeather} style={{ backgroundColor: '#87CEEB', border: '1px solid grey', padding: '10px 15px', cursor: 'pointer', borderRadius: '50px'}}>
          Get Weather
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2 >Weather in {city}</h2>
          <p>Temperature: {weather.temp} °C</p>
          <p>Description: {weather.description}</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind Speed: {weather.wind} m/s</p>
        </div>
      )}

      <div className="bouncy-sun"></div>
      <div className="clouds">
        <div className="cloud" style={{
          width: '200px',
          height: '100px',
          background: 'white',
          borderRadius: '100px 100px 60px 60px',
          position: 'absolute',
          top: '50px',
          left: '100px',
          boxShadow: '20px 20px 0 white, -20px -20px 0 white'
        }}></div>
        <div className="cloud" style={{
          width: '250px',
          height: '120px',
          background: 'white',
          borderRadius: '125px 125px 75px 75px',
          position: 'absolute',
          top: '150px',
          left: '300px',
          boxShadow: '25px 25px 0 white, -25px -25px 0 white'
        }}></div>
        <div className="cloud" style={{
          width: '180px',
          height: '90px',
          background: 'white',
          borderRadius: '90px 90px 45px 45px',
          position: 'absolute',
          top: '100px',
          left: '500px',
          boxShadow: '18px 18px 0 white, -18px -18px 0 white'
        }}></div>
      </div>
    </div>
  );
};

export default App;