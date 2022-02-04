import React from "react";
import { Weather } from "src/types/meteo";
import WeatherDisplay from "./WeatherDisplay";
import "./DailyWeatherDisplay.css";

type DailyWeatherDisplayProps = {
  weather: Weather;
  date: number;
};

const DailyWeatherDisplay: React.FC<DailyWeatherDisplayProps> = ({
  weather,
  date,
}) => {
  return (
    <div className="daily-weather-display">
      <span className="date">{new Date(date * 1000).toString()}</span>
      <WeatherDisplay weather={weather} />
    </div>
  );
};

export default DailyWeatherDisplay;
