import React, { useEffect, useState } from "react";
import WeatherDisplay from "../components/WeatherDisplay";
import { Geolocation } from "@capacitor/geolocation";
import { Coords, Meteo } from "src/types/meteo";
import { IonPage, IonContent, IonButton, useIonRouter } from "@ionic/react";
import "./Search.css";
import axios from "axios";
import DailyWeatherDisplay from "src/components/DailyWeatherDisplay";
import FavoriteButton from "src/components/FavoriteButton";
import LocationWeatherDisplay from "src/components/LocationWeatherDisplay";
import { getCoordsFromCityName, getCoordsMeteo } from "src/api/openweather";

const LocationWeather = () => {
  const router = useIonRouter();
  const [meteo, setmeteo] = useState<Meteo>();
  const [city, setcity] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(router.routeInfo.search);

    setcity(params.get("city") as string);

    const coords: Coords = {
      lon: parseInt(params.get("lon") as string),
      lat: parseInt(params.get("lat") as string),
    };

    getCoordsMeteo(coords).then((response) => {
      setmeteo(response.data);
    });
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">
          <h1 className="title">La météo à {city}</h1>
          {meteo && (
            <div>
              <FavoriteButton
                coords={{ lat: meteo.lat, lon: meteo.lon }}
                city={city}
              />
              <LocationWeatherDisplay meteo={meteo} />
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LocationWeather;
