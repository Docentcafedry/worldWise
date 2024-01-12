import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCity } from "../providers/CitiesProvider";
import { useNavigate } from "react-router-dom";

const dateFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

export default function CityItem({ city }) {
  const navigator = useNavigate();
  const { deleteCity } = useCity();
  const { cityName, emoji, date, id } = city;
  const { lat, lng } = city.position;

  async function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
    // await deleteCity(id);
    // navigator("");
  }
  return (
    <li>
      <Link to={`${id}?lat=${lat}&lng=${lng}`} className={styles.cityItem}>
        <span className={styles.emogi}>{emoji}</span>
        <p className={styles.name}>{cityName}</p>
        <span className={styles.date}>
          {new Date(date).toLocaleDateString("en-us", dateFormatOptions)}
        </span>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}
