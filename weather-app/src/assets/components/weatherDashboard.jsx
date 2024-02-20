import "../styles/weather.css";
import { useState } from "react";

export default function WeatherDashboard() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [savedCities, setSavedCities] = useState([]);

  const API_KEY = "69eae22246c99d7ef04834b3642564ff";
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  function obtenerClima() {
    if (!city) {
      alert("Introduce una ciudad");
      return;
    }

    fetch(currentWeatherUrl)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setSavedCities((prevCities) => [...prevCities, createCityCard(data)]);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error en solicitud de búsqueda. Intente de nuevo");
      });
  }

  function handleSaveCity(cityName) {
    if (savedCities.some((city) => city.name === cityName)) {
      setSavedCities((prevCities) =>
        prevCities.filter((city) => city.name !== cityName)
      );
    } else {
      setSavedCities((prevCities) => [
        ...prevCities,
        createCityCard(weatherData),
      ]);
    }
  }

  function createCityCard(cityData) {
    return {
      name: cityData.name,
      temperature: Math.round(cityData.main.temp - 273.15),
      description: cityData.weather[0].description,
      main: cityData.weather[0].main,
      speed: cityData.wind.speed,
      deg: cityData.wind.deg,
      temp_min: cityData.main.temp_min,
      temp_max: cityData.main.temp_max,
      latitude: cityData.coord.lat,
      longitude: cityData.coord.lon,
    };
  }

  return (
    <>
      <div className="weather">
        <h1>Clima</h1>
        <div className="weather-container">
          <input
            type="text"
            className="input-w"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Introduce ciudad"
          />
          <button onClick={() => obtenerClima()}>Search</button>

          {weatherData && (
            <div className="card">
              <div className="heart-container" title="Like">
                <input
                  type="checkbox"
                  className="checkbox"
                  id="Give-It-An-Id"
                  checked={
                    savedCities.some(
                      (savedCity) => savedCity.name === weatherData.name
                    )
                  }
                  onChange={() => handleSaveCity(weatherData.name)}
                />
                <div className="svg-container">
                  <svg
                    viewBox="0 0 24 24"
                    className="svg-outline"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                  </svg>
                  <svg
                    viewBox="0 0 24 24"
                    className="svg-filled"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                  </svg>
                  <svg
                    className="svg-celebrate"
                    width="100"
                    height="100"
                    xmlns="http://www.w3.org/2000/svg">
                    <polygon points="10,10 20,20"></polygon>
                    <polygon points="10,50 20,50"></polygon>
                    <polygon points="20,80 30,70"></polygon>
                    <polygon points="90,10 80,20"></polygon>
                    <polygon points="90,50 80,50"></polygon>
                    <polygon points="80,80 70,70"></polygon>
                  </svg>
                </div>
              </div>
              <img
                id="weather-icon"
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                alt="Weather Icon"
                style={{ display: "flex", width: "20%", padding: "10px"}}
              />
                <h1>{Math.round(weatherData.main.temp - 273.15)}°C</h1>

              <div >
                <p>
                  <strong>Name: </strong>
                  {weatherData.name}
                </p>
                <p>
                  <strong>Description: </strong>
                  {weatherData.weather[0].description}
                </p>
                <p>
                  <strong>Main: </strong>
                  {weatherData.weather[0].main}
                </p>
                <p>
                  <strong>Speed: </strong>
                  {weatherData.wind.speed}
                </p>
                <p>
                  <strong>Deg: </strong>
                  {weatherData.wind.deg}
                </p>
                <p>
                  <strong>Temp min: </strong>
                  {weatherData.main.temp_min}
                </p>
                <p>
                  <strong>Temp max: </strong>
                  {weatherData.main.temp_max}
                </p>
                <p>
                  <strong>Latitude: </strong>
                  {weatherData.coord.lat}
                </p>
                <p>
                  <strong>Longitude: </strong>
                  {weatherData.coord.lon}
                </p>
              </div>
            </div>
          )}

          <h3>Busquedas preferidas</h3>
          <div id="saved-cities" className="column2">
            {savedCities.map((savedCity) => (
              <div key={savedCity.name}>
                <div className="city-card card">
                  <p>
                    <strong>Name: </strong> {savedCity.name}
                  </p>
                  <p>
                    <strong>Temperature: </strong> {savedCity.temperature}°C
                  </p>
                  <p>
                    <strong>Description: </strong> {savedCity.description}
                  </p>
                  <p>
                    <strong>Main: </strong> {savedCity.main}
                  </p>
                  <p>
                    <strong>Speed: </strong>
                    {savedCity.speed}
                  </p>
                  <p>
                    <strong>Deg: </strong>
                    {savedCity.deg}
                  </p>
                  <p>
                    <strong>Temp min: </strong>
                    {savedCity.temp_min}
                  </p>
                  <p>
                    <strong>Temp max: </strong>
                    {savedCity.temp_max}
                  </p>
                  <p>
                    <strong>Latitude: </strong>
                    {savedCity.latitude}
                  </p>
                  <p>
                    <strong>Longitude: </strong>
                    {savedCity.longitude}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
