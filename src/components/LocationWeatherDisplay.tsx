import React from "react";
import { RawWeather } from "src/types/meteo";
import {
  formatRawDailyWeatherToWeather,
  formatRawWeatherToWeather,
} from "src/utils/formatter";
import CompactWeatherDisplay from "./CompactWeatherDisplay";
import DailyWeatherDisplay from "./CompactWeatherDisplay";
import WeatherDisplay from "./WeatherDisplay";
import "./LocationWeatherDisplay.css";

type LocationWeatherDisplayProps = {
  rawWeather: RawWeather;
};

const LocationWeatherDisplay: React.FC<LocationWeatherDisplayProps> = ({
  rawWeather,
}) => {
  return (
    <div>
      <h2 className="subtitle">En ce moment</h2>
      {rawWeather && (
        <WeatherDisplay weather={formatRawWeatherToWeather(rawWeather)} />
      )}
      <h2 className="subtitle">Les jours suivants</h2>
      <div className="daily-weather">
        {rawWeather?.daily.map((dailyMeteo) => (
          <CompactWeatherDisplay
            key={dailyMeteo.dt}
            date={dailyMeteo.dt}
            weather={formatRawDailyWeatherToWeather(dailyMeteo)}
          />
        ))}
      </div>
    </div>
  );
};

export default LocationWeatherDisplay;
