import { createContext, useState, useEffect, useContext } from "react";

const cityContext = createContext();

const URL = "http://localhost:9000/";

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoaded(true);
        const res = await fetch(`${URL}${"cities"}`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        alert("Something went wrong");
      } finally {
        setIsLoaded(false);
      }
    }
    fetchData();
  }, []);

  async function fetchCity(id) {
    try {
      setIsLoaded(true);
      const res = await fetch(`${URL}${"cities"}/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      alert("Something went wrong with city");
    } finally {
      setIsLoaded(false);
    }
  }

  return (
    <cityContext.Provider value={{ cities, isLoaded, currentCity, fetchCity }}>
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
