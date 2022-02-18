import { useEffect, useState } from "react";
import { Coords, RawWeather } from "src/types/meteo";
import { IonPage, IonContent, IonButton } from "@ionic/react";
import "./Favorites.css";
import {
  getCoordsFromCityName,
  getCurrentRawWeather,
} from "src/api/openweather";
import WeatherDisplay from "src/components/WeatherDisplay";
import { Link } from "react-router-dom";
import { Favorite } from "src/types/misc";
import { formatRawWeatherToWeather } from "src/utils/formatter";

type FavoriteMeteo = {
  city: string;
  meteo: RawWeather;
};

const Favorites = () => {
  const [favorites, setfavorites] = useState<Favorite[]>([]);
  const [favoritemeteos, setfavoritemeteos] = useState<FavoriteMeteo[]>([]);

  useEffect(() => {
    let favoritesString = localStorage.getItem("favorites");

    if (!favoritesString) {
      setfavorites([]);
      return;
    }

    const favorites: Favorite[] = JSON.parse(favoritesString);
    setfavorites(favorites);
  }, []);

  useEffect(() => {
    favorites.forEach((favorite) => {
      getCurrentRawWeather(favorite.coords).then((response) => {
        const meteo = response.data;
        setfavoritemeteos((favoritemeteos) => [
          ...favoritemeteos,
          { city: favorite.city, meteo },
        ]);
      });
    });
  }, [favorites]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">
          <h1 className="title">Vos météos favorites</h1>
          <div className="favorites">
            {favoritemeteos.map((favoritemeteo) => (
              <Link
                key={favoritemeteo.city}
                to={`/locationWeather?lat=${favoritemeteo.meteo.lat}&lon=${favoritemeteo.meteo.lon}&city=${favoritemeteo.city}`}
                className="favorite-meteo"
              >
                <WeatherDisplay
                  city={favoritemeteo.city}
                  weather={formatRawWeatherToWeather(favoritemeteo.meteo)}
                />
              </Link>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
