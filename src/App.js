import React, { useState } from 'react';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import CloudIcon from '@material-ui/icons/Cloud';

const api = {
  key: "211740d2e64d994282006cbc6f206831",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }
  
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined") ? 
          ((weather.weather[0].main === 'Thunderstorm' || weather.weather[0].main === 'Rain') ? 'cold-text app rainy' : 
          ((weather.main.temp < 16) ? 'cold-text app cold' : 'sunny-text app sunny')) 
        : 'app'
      }>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar" 
            placeholder="Search ..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div> 

        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
            <div className="weather-description">
              {weather.weather[0].description}
              <span className='weather-icon'>
                { weather.weather[0].main !== "Rain" 
                  && weather.weather[0].main !== "Thunderstorm" 
                  && weather.weather[0].main !== "Clouds" 
                  ? <WbSunnyIcon /> : <CloudIcon />}
              </span>  
            </div>
          </div>
        </div>
        ) : (
          <div className='empty-box'>
              Enter a city name ..
              <div className='big-icon'><CloudIcon /></div>
              <div className='big-icon'><WbSunnyIcon /></div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
