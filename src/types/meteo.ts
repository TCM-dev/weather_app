export type Coords = {
  lon: number;
  lat: number;
};

export type Weather = {
  temp: number;
  // temp_max: number;
  // temp_min: number;
  feels_like: number;
  humidity: number;
  pressure: number;
};

export type Meteo = {
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
  daily: {
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
  }[];
};

// export type Weather = {
//   id: number;
//   main: string;
//   description: string;
//   icon: string;
// };

// export type WeatherValues = {
//   temp: number;
//   feels_like: number;
//   temp_min: number;
//   temp_max: number;
//   pressure: number;
//   humidity: number;
// };

// export type Meteo = {
//   coord: Coords;
//   weather: Weather[];
//   base: string;
//   main: WeatherValues;
//   wind: {
//     speed: number;
//     deg: number;
//   };
//   timezone: number;
//   id: number;
//   name: string;
//   cod: number;
// };

// export type DailyForecast = {
//   list: {
//     temp: {
//       day: number;
//       min: number;
//       max: number;
//       night: number;
//       eve: number;
//       morn: number;
//     };
//     feels_like: {
//       day: number;
//       night: number;
//       eve: number;
//       morn: number;
//     };
//     pressure: number;
//     humidity: number;
//     weather: Weather[];
//     speed: number;
//     deg: number;
//     gust: number;
//     clouds: number;
//     pop: number;
//   }[];
// };
