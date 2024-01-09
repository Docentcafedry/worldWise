import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

const dateFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

export default function CityItem({ city }) {
  const { cityName, emoji, date, id } = city;
  const { lat, lng } = city.position;
  return (
    <li>
      <Link to={`${id}?lat=${lat}&lng=${lng}`} className={styles.cityItem}>
        <span className={styles.emogi}>{emoji}</span>
        <p className={styles.name}>{cityName}</p>
        <span className={styles.date}>
          {new Date(date).toLocaleDateString("en-us", dateFormatOptions)}
        </span>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
