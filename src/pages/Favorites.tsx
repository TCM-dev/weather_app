import { useEffect, useState } from "react";
import { Coords, Meteo } from "src/types/meteo";
import { IonPage, IonContent, IonButton } from "@ionic/react";
import "./Favorites.css";
import { getCoordsFromCityName, getCoordsMeteo } from "src/api/openweather";
import WeatherDisplay from "src/components/WeatherDisplay";
import { Link } from "react-router-dom";
import { Favorite } from "src/types/misc";

type FavoriteMeteo = {
  city: string;
  meteo: Meteo;
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
      getCoordsMeteo(favorite.coords).then((response) => {
        const meteo = response.data;
        setfavoritemeteos((favoritemeteos) => [
          ...favoritemeteos,
          { city: favorite.city, meteo },
        ]);
      });
    });
  }, [favorites]);

  useEffect(() => {
    // Debug purposes only
    console.log(favorites);
  }, [favorites]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">
          <h1 className="title">Vos météos favorites</h1>
          {favoritemeteos.map((favoritemeteo) => (
            <Link
              key={favoritemeteo.city}
              to={`/locationWeather?lat=${favoritemeteo.meteo.lat}&lon=${favoritemeteo.meteo.lon}&city=${favoritemeteo.city}`}
            >
              <div>
                <h2>{favoritemeteo.city}</h2>
                <WeatherDisplay weather={favoritemeteo.meteo.current} />
              </div>
            </Link>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
