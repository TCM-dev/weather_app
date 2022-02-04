import { IonButton } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Coords } from "src/types/meteo";
import { Favorite } from "src/types/misc";

const FavoriteButton: React.FC<Favorite> = ({ coords, city }) => {
  // Used only to refresh because localStorage is not reactive
  const [date, setdate] = useState<Date>();

  useEffect(() => {
    const favorites = localStorage.getItem("favorites");

    if (!favorites) {
      localStorage.setItem("favorites", JSON.stringify([]));
    }
  });

  const addToFavorites = () => {
    const favoritesString = localStorage.getItem("favorites");

    const favorites: Favorite[] = JSON.parse(favoritesString!);

    favorites.push({ city, coords });

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setdate(new Date());
  };

  const removeFromFavorites = () => {
    const favoritesString = localStorage.getItem("favorites");

    const favorites: Favorite[] = JSON.parse(favoritesString!);

    const newFavorites = favorites.filter((favorite) => {
      return city !== favorite.city;
    });

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setdate(new Date());
  };

  const areCoordsInFavorites = () => {
    const favoritesString = localStorage.getItem("favorites");

    if (!favoritesString) {
      return false;
    }

    const favorites: Favorite[] = JSON.parse(favoritesString!);

    return favorites.find((favorite) => {
      return city === favorite.city;
    });
  };

  const isFavorite = areCoordsInFavorites();

  if (isFavorite) {
    return (
      <IonButton onClick={removeFromFavorites}>
        Retirer "{city}" des favoris
      </IonButton>
    );
  }

  return (
    <IonButton onClick={addToFavorites}>Ajouter "{city}" aux favoris</IonButton>
  );
};

export default FavoriteButton;
