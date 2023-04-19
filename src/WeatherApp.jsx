import React, { useState } from "react";
import "./App.css";

const WeatherApp = () => {
  const [city, setCity] = useState("bharatpur,np");
  const [weatherData, setWeatherData] = useState(null);
  const [temp, setTemp] = useState(null);
  const [temp2, setTemp2] = useState(null);
  const [rise, setRise] = useState(null);
  const [set, setSet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b22724405f312a7888b4469f9bb569ad`
    );
    const data = await response.json();
    if (data.cod !== 200) {
      setError(data.message);
    } else {
      setError(null);
      setWeatherData(data);
      setTemp((data.main.temp - 273.15).toFixed(2));
      setTemp2((data.main.feels_like - 273.15).toFixed(2));
      setSet(new Date(data.sys.sunset * 1000).toTimeString().slice(0, 8));
      setRise(new Date(data.sys.sunrise * 1000).toTimeString().slice(0, 8));
    }
    setIsLoading(false);
  };

  return (
    <div className="weather-today">
      <div className="head">Search Weather By City:</div>
      <div className="form">
        <input
          type="text"
          placeholder="Enter City Name"
          onChange={handleCityChange}
          className="input"
        />
        <button className="button" onClick={handleSubmit}>
          Get Weather
        </button>
      </div>
      <div className="content">
        {isLoading ? (
          <div className="loading">Retrieving Data...</div>
        ) : error ? (
          <div className="error">
            Error: {error},<br /> Enter a valid city name
          </div>
        ) : weatherData ? (
          <div className="weather">
            <div className="city">
              {weatherData.name}, {weatherData.sys.country}
            </div>
            <div className="coord">
              <div>Long: {weatherData.coord.lon}</div>
              <div>Lat: {weatherData.coord.lat}</div>
            </div>
            <div className="temp">{temp}°C</div>
            <div className="temp2">feels like: {temp2}°C</div>
            <div className="desc">{weatherData.weather[0].description}</div>
            <div className="sun">
              <div>
                Sunrise: <br />
                {rise}
              </div>
              <div>
                Sunset:
                <br /> {set}
              </div>
            </div>
            <div className="cloud">Cloud cover: {weatherData.clouds.all}%</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WeatherApp;
