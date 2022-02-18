import React from "react";
import { Weather } from "src/types/meteo";
import { formatTemperature } from "src/utils/formatter";
import "./WeatherDisplay.css";

type WeatherDisplayProps = {
  weather: Weather;
  city?: string;
};

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather, city }) => {
  const icon = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return (
    <div className="weather-display">
      {city && <span className="city">{city}</span>}

      <span>{formatTemperature(weather.temp)}°C</span>

      <div className="icon__wrapper">
        <img src={icon} />
      </div>

      <p>{weather.description}</p>
    </div>
  );
};

export default WeatherDisplay;
