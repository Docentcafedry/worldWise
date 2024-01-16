import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

const cityContext = createContext();

const URL = "http://localhost:9000/";

const initialState = {
  cities: [],
  isLoaded: false,
  currentCity: {},
  errorMessage: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "switchLoader":
      return { ...state, isLoaded: !state.isLoaded };

    case "setCities":
      return {
        ...state,
        cities: action.payload,
      };

    case "setError":
      return { ...state, errorMessage: action.payload };

    case "setCurrentCity":
      return { ...state, currentCity: action.payload };

    case "postCity":
      return { ...state, cities: [...state.cities, action.payload] };

    case "deleteCity":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
  }
}

function CityProvider({ children }) {
  const [{ cities, isLoaded, currentCity }, dispatcher] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchData() {
      try {
        dispatcher({ type: "switchLoader" });
        const res = await fetch(`${URL}${"cities"}`);
        const data = await res.json();
        dispatcher({ type: "setCities", payload: data });
      } catch (err) {
        dispatcher({ type: "setError", payload: "Something went wrong" });
      } finally {
        dispatcher({ type: "switchLoader" });
      }
    }
    fetchData();
  }, []);

  const fetchCity = useCallback(async function (id) {
    try {
      dispatcher({ type: "switchLoader" });
      const res = await fetch(`${URL}${"cities"}/${id}`);
      const data = await res.json();
      dispatcher({ type: "setCurrentCity", payload: data });
    } catch (err) {
      dispatcher({ type: "setError", payload: "Something went wrong" });
    } finally {
      dispatcher({ type: "switchLoader" });
    }
  }, []);

  async function postCity(city) {
    try {
      dispatcher({ type: "switchLoader" });
      const res = await fetch(`${URL}${"cities"}`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      dispatcher({ type: "postCity", payload: data });
    } catch (err) {
      dispatcher({ type: "setError", payload: "Something went wrong" });
    } finally {
      dispatcher({ type: "switchLoader" });
    }
  }

  async function deleteCity(id) {
    try {
      dispatcher({ type: "switchLoader" });
      const res = await fetch(`${URL}${"cities"}/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      dispatcher({ type: "deleteCity", payload: id });
    } catch (err) {
      dispatcher({ type: "setError", payload: "Something went wrong" });
    } finally {
      dispatcher({ type: "switchLoader" });
    }
  }

  return (
    <cityContext.Provider
      value={{ cities, isLoaded, currentCity, fetchCity, postCity, deleteCity }}
    >
      {children}
    </cityContext.Provider>
  );
}

function useCity() {
  const state = useContext(cityContext);
  if (!state) throw new Error("used in place where there is no cityContext");
  return state;
}

export { cityContext, CityProvider, useCity };
