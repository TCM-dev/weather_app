import React from "react";
import { Meteo } from "src/types/meteo";
import DailyWeatherDisplay from "./DailyWeatherDisplay";
import WeatherDisplay from "./WeatherDisplay";

type LocationWeatherDisplayProps = {
  meteo: Meteo;
};

const LocationWeatherDisplay: React.FC<LocationWeatherDisplayProps> = ({
  meteo,
}) => {
  return (
    <div>
      <h2 className="subtitle">En ce moment</h2>
      {meteo && <WeatherDisplay weather={meteo.current} />}
      <h2 className="subtitle">Les jours suivants</h2>
      <div>
        {meteo?.daily.map((dailyMeteo) => (
          <DailyWeatherDisplay
            key={dailyMeteo.dt}
            date={dailyMeteo.dt}
            weather={{
              feels_like: dailyMeteo.feels_like.day,
              pressure: dailyMeteo.pressure,
              humidity: dailyMeteo.humidity,
              temp: dailyMeteo.temp.day,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LocationWeatherDisplay;
