import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pricing from "./assets/pages/Pricing";
import Product from "./assets/pages/Product";
import HomePage from "./assets/pages/HomePage";
import Login from "./assets/pages/Login";
import AppLayout from "./assets/pages/AppLayout";
import PageNotFound from "./assets/pages/PageNotFound";
import CityList from "./assets/components/CityList";
import CountryList from "./assets/components/CountryList";
import { useEffect, useState } from "react";
import City from "./assets/components/City";

const URL = "http://localhost:9000/";

export default function App() {
  const [cities, setCities] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoaded={isLoaded} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoaded={isLoaded} />}
          />
          <Route path="countries" element={<CountryList cities={cities} />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
