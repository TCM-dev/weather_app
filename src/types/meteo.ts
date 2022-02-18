export type Coords = {
  lon: number;
  lat: number;
};

export type Weather = {
  temp: number;
  // feels_like: number;
  // humidity: number;
  // pressure: number;
  icon: string;
  description: string;
};

export type RawWeather = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
  };
  daily: RawDailyWeather[];
};

export type RawDailyWeather = {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: { day: number; night: number; eve: number; morn: number };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: [
    { id: number; main: "Rain"; description: "light rain"; icon: "10d" }
  ];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
};
