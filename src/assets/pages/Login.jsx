import NavComponent from "../components/NavComponent";
import styles from "./Login.module.css";
import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import Button from "../components/Button";
import { useNavigate } from "react-router";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const navigate = useNavigate();

  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  console.log(isAuthenticated);

  function handleLogin(e) {
    e.preventDefault();
    const successAuth = login(email, password);
    if (!successAuth) return;
    navigate("/app", { replace: true });
  }

  return (
    <main className={styles.login}>
      <NavComponent />
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
