import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import CityList from "./assets/components/CityList";
import CountryList from "./assets/components/CountryList";
import City from "./assets/components/City";
import Form from "./assets/components/Form";
import { CityProvider } from "./assets/providers/CitiesProvider";
import { AuthProvider } from "./assets/providers/AuthProvider";
import SpinnerFullPage from "./assets/components/SpinnerFullPage";
import ProtectedRoute from "./assets/pages/ProtectedRoute";

const HomePage = lazy(() => import("./assets/pages/HomePage"));
const Pricing = lazy(() => import("./assets/pages/Pricing"));
const Login = lazy(() => import("./assets/pages/Login"));
const PageNotFound = lazy(() => import("./assets/pages/PageNotFound"));
const AppLayout = lazy(() => import("./assets/pages/AppLayout"));
const Product = lazy(() => import("./assets/pages/Product"));

export default function App() {
  return (
    <AuthProvider>
      <CityProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CityProvider>
    </AuthProvider>
  );
}
