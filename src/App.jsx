import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Pricing from "./assets/pages/Pricing";
import Product from "./assets/pages/Product";
import HomePage from "./assets/pages/HomePage";
import Login from "./assets/pages/Login";
import AppLayout from "./assets/pages/AppLayout";
import PageNotFound from "./assets/pages/PageNotFound";
import CityList from "./assets/components/CityList";
import CountryList from "./assets/components/CountryList";
import City from "./assets/components/City";
import Form from "./assets/components/Form";
import { CityProvider } from "./assets/providers/CitiesProvider";

export default function App() {
  return (
    <CityProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CityProvider>
  );
}
