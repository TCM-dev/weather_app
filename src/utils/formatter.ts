import { RawDailyWeather, RawWeather, Weather } from "src/types/meteo";

export const formatRawWeatherToWeather = (rawWeather: RawWeather): Weather => {
  return { ...rawWeather.current, ...rawWeather.current.weather[0] };
};

export const formatRawDailyWeatherToWeather = (
  rawDailyWeather: RawDailyWeather
): Weather => {
  return { ...rawDailyWeather.weather[0], temp: rawDailyWeather.temp.day };
};

export const formatTemperature = (temperature: number): string => {
  return temperature.toFixed(0);
};
