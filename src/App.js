
import axios from "axios";
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [tempType, setTempType] = useState("C");
  const MINUTE_MS = 10000;
  const apiAddress = "https://api.weatherapi.com/v1/forecast.json?key=66656cd159d3477886c134122232210&q=Istanbul&days=1&q=Istanbul"
  useEffect(() => {
    async function getWeather(){
      try {
        const response = await axios.get(apiAddress);
        setWeather(response?.data);

      } catch(error){
        console.log(error);
      }
    }
    getWeather();
    const interval = setInterval(() => {
      getWeather();
    }, MINUTE_MS);
  
    return () => clearInterval(interval); 
    
  }, [])

  const renderWeatherHour =  (hourWeatherList) => {
    let html = <></>;
    html = hourWeatherList?.map((item) => {
      let time = new Date(item?.time);
      time = time.getHours()
      var ampm = time >= 12 ? ' pm' : ' am';
      time = time % 12;
      time = time ? time : 12; // the hour '0' should be '12'
      let timeText = time + ampm;
      return(
        <div className="weather-temp">
          <p>{timeText}</p>
          <img src={item?.condition?.icon}/> 
          <p>{tempType === "C" ? item?.temp_c : item?.temp_f}°</p>
        </div>
      )
    })
    return html;
  }
  return (
    <div className="App">
      <h1>Weather App Project</h1>
      <div className="container">
        <div className="weather-container">
          <div className="weather-title-container">
            <div>
              <p className="location-name">{weather?.location?.name}</p>
              <p>{weather?.location?.name}, {weather?.location?.country} </p>
            </div>
            <div>
              <span className="weather-type" onClick={() => setTempType("C")}>°C</span>
              <span className="weather-type" onClick={() => setTempType("F")}>°F</span>
            </div>
          </div>
          <div className="weather-item-container">

            {renderWeatherHour(weather?.forecast?.forecastday[0]?.hour)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
