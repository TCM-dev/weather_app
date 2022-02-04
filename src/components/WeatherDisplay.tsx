import React from "react";
import { Weather } from "src/types/meteo";
import "./WeatherDisplay.css";

type WeatherDisplayProps = {
  weather: Weather;
};

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  return (
    <div className="weather-display">
      <p>Température actuelle : {weather.temp}°C</p>
      {/* <p>Température maximale : {weather.temp_max}</p>
        <p>Température minimale : {weather.temp_min}</p> */}
      <p>Température ressentie : {weather.feels_like}°C</p>
      <p>Humidité : {weather.humidity}</p>
      <p>Pression atmosphérique : {weather.pressure}</p>
    </div>
  );
};

export default WeatherDisplay;
