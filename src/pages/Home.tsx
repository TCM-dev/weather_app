import { useEffect, useState } from "react";
import { Geolocation } from "@capacitor/geolocation";
import { Meteo } from "src/types/meteo";
import "./Home.css";
import { IonPage, IonContent } from "@ionic/react";
import LocationWeatherDisplay from "src/components/LocationWeatherDisplay";
import { getCoordsMeteo } from "src/api/openweather";
import FavoriteButton from "src/components/FavoriteButton";

const Home = () => {
  const [meteo, setmeteo] = useState<Meteo>();

  const fetchUserMeteo = async () => {
    const coordinates = await Geolocation.getCurrentPosition();

    const coords = {
      lat: coordinates.coords.latitude,
      lon: coordinates.coords.longitude,
    };

    getCoordsMeteo(coords).then((response) => {
      setmeteo(response.data);
    });
  };

  useEffect(() => {
    fetchUserMeteo();
  }, []);

  useEffect(() => {
    // Debug purposes only
    console.log(meteo);
  }, [meteo]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">
          <h1 className="title">Météo locale</h1>
          {meteo && (
            <div>
              <FavoriteButton
                coords={{ lat: meteo.lat, lon: meteo.lon }}
                city={"Météo locale"}
              />
              <LocationWeatherDisplay meteo={meteo} />
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
