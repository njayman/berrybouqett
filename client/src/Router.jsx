import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "@scenes/layout";
import Dashboard from "@scenes/dashboard";
import Products from "@scenes/products";
import Customers from "@scenes/customers";
import Transactions from "@scenes/transactions";
import Geography from "@scenes/geography";
import Overview from "@scenes/overview";
import Daily from "@scenes/daily";
import Monthly from "@scenes/monthly";
import Breakdown from "@scenes/breakdown";
import { useIsAuthenticated } from "react-auth-kit";
import Auth from "@scenes/auth";
import Notes from "@scenes/notes";

const PrivateRoute = ({ Component }) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();
  return auth ? <Component /> : <Navigate to="/login" />;
};

const Router = () => {
  const isAuthenticated = useIsAuthenticated();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <Navigate
                to={isAuthenticated() ? "/dashboard" : "/login"}
                replace
              />
            }
          />
          <Route path="/login" element={<Auth />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute Component={Dashboard} />}
          />
          <Route path="/notes" element={<PrivateRoute Component={Notes} />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/geography" element={<Geography />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/monthly" element={<Monthly />} />
          <Route path="/breakdown" element={<Breakdown />} />
          {/* <Route path="/admin" element={<Admin />} />
                <Route path="/performance" element={<Performance />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
