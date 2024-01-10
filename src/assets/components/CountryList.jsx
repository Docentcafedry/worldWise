import styles from "./CityList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCity } from "../providers/CitiesProvider";

export default function CountryList() {
  const { cities } = useCity();
  const countries = cities.reduce((cur, next) => {
    if (cur.map((city) => city.country).includes(next.country)) {
      return [...cur];
    } else {
      return [...cur, next];
    }
  }, []);

  if (!cities.length)
    return <Message message={"There are no visited cities yet"} />;

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}
