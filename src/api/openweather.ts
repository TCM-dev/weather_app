import axios, { AxiosResponse } from "axios";
import { Coords, RawWeather } from "src/types/meteo";

const openweather = axios.create({
  baseURL: "https://api.openweathermap.org/",
});

openweather.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.params["appid"] = "d0d65cf050b84b0ab3cea15f4cac461e";
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const getCurrentRawWeather = (coords: Coords) => {
  return openweather.get<RawWeather>("data/2.5/onecall", {
    params: {
      lat: coords.lat,
      lon: coords.lon,
      units: "metric",
    },
  });
};

export const getCoordsFromCityName = (name: string) => {
  return openweather.get("geo/1.0/direct", {
    params: {
      q: name,
      limit: 1,
    },
  });
};
