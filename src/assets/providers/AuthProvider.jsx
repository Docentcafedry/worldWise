import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: {},
  isAuthenticated: false,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };

    case "logout":
      return { ...initialState };
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatcher] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (FAKE_USER.email !== email || FAKE_USER.password !== password)
      return false;
    console.log("Bad Credential");

    dispatcher({ type: "login", payload: FAKE_USER });
    return true;
  }

  function logout() {
    dispatcher({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("You trying use AuthContext out of its provider");
  return context;
}

export { AuthProvider, useAuth };
