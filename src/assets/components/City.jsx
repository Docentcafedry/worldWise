import styles from "./City.module.css";
import { useParams, useNavigate } from "react-router";
import { useCity } from "../providers/CitiesProvider";
import { useEffect } from "react";
import Spinner from "./Spinner";
import Button from "./Button";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentCity, fetchCity, isLoaded } = useCity();
  const { cityName, emoji, date, notes } = currentCity;

  useEffect(
    function () {
      fetchCity(id);
    },
    [id]
  );

  if (isLoaded) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} {emoji} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
          type="back"
          clickHandler={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </div>
  );
}

export default City;
