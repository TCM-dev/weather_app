import React from "react";
import { Weather } from "src/types/meteo";
import WeatherDisplay from "./WeatherDisplay";
import "./CompactWeatherDisplay.css";
import { formatTemperature } from "src/utils/formatter";

type CompactWeatherDisplayProps = {
  weather: Weather;
  date: number;
};

const CompactWeatherDisplay: React.FC<CompactWeatherDisplayProps> = ({
  weather,
  date,
}) => {
  const icon = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return (
    <div className="daily-weather-display">
      {/* <span className="city">City name</span> */}

      <div className="icon__wrapper">
        <img src={icon} />
      </div>

      <div className="informations">
        <span>14H</span>

        <span>{formatTemperature(weather.temp)}°C</span>

        <p>{weather.description}</p>
      </div>
    </div>
  );
};

export default CompactWeatherDisplay;
