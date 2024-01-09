import styles from "./Button.module.css";

export default function Button({ children, type, clickHandler }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={clickHandler}>
      {children}
    </button>
  );
}
