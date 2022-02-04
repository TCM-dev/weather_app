import React, { useEffect, useState } from "react";
import WeatherDisplay from "../components/WeatherDisplay";
import { Geolocation } from "@capacitor/geolocation";
import { Coords, Meteo } from "src/types/meteo";
import { IonPage, IonContent, IonButton } from "@ionic/react";
import "./Search.css";
import axios from "axios";
import DailyWeatherDisplay from "src/components/DailyWeatherDisplay";
import FavoriteButton from "src/components/FavoriteButton";
import LocationWeatherDisplay from "src/components/LocationWeatherDisplay";
import { getCoordsFromCityName, getCoordsMeteo } from "src/api/openweather";

const key = "d0d65cf050b84b0ab3cea15f4cac461e";

type City = {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
};

const Search = () => {
  const [search, setsearch] = useState("");
  const [loading, setloading] = useState(false);
  const [meteo, setmeteo] = useState<Meteo>();
  const [coords, setcoords] = useState<Coords>();
  const [city, setcity] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setloading(true);
    getCoordsFromCityName(search).then((response) => {
      const city = response.data[0];
      const coords = { lon: city.lon, lat: city.lat };
      setcity(city.name);
      setcoords(coords);
      fetchMeteo(coords);
    });
  };

  const fetchMeteo = (coords: Coords) => {
    getCoordsMeteo(coords)
      .then((response) => {
        setmeteo(response.data);
      })
      .finally(() => setloading(false));
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">
          <h1 className="title">Rechercher la météo sur une ville</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="search">Nom de la ville</label>
            <input
              type="search"
              name="search"
              id="search"
              className="search-input"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              autoFocus
            />
            <IonButton type="submit">Rechercher</IonButton>
          </form>

          {!loading && meteo && (
            <>
              <FavoriteButton city={city} coords={coords!} />
              <LocationWeatherDisplay meteo={meteo} />
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Search;
