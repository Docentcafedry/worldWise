import { useState, useEffect } from "react";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";

import { useCity } from "../providers/CitiesProvider";

export default function CityList() {
  const { cities, isLoaded } = useCity();
  if (isLoaded) return <Spinner />;

  if (!cities.length)
    return <Message message={"There are no visited cities yet"} />;

  return (
    <div>
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <CityItem key={city.id} city={city} />
        ))}
      </ul>
    </div>
  );
}
