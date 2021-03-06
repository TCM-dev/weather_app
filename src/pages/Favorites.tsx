import { SetStateAction, useEffect, useState } from "react";
import { Coords, RawWeather } from "src/types/meteo";
import {
  IonPage,
  IonContent,
  IonButton,
  useIonViewDidEnter,
} from "@ionic/react";
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

  const fetchFavorites = () => {
    let favoritesString = localStorage.getItem("favorites");

    if (!favoritesString) {
      setfavorites([]);
      return;
    }

    const favorites: Favorite[] = JSON.parse(favoritesString);
    setfavorites(favorites);
  };

  useIonViewDidEnter(fetchFavorites, []);

  useEffect(() => {
    const requests = favorites.map((favorite) =>
      getCurrentRawWeather(favorite.coords)
    );

    Promise.all(requests).then((responses) => {
      const meteos = responses.map((response, index) => {
        const meteo = response.data;
        const city = favorites[index].city;
        return { city, meteo };
      });

      setfavoritemeteos(meteos);
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
