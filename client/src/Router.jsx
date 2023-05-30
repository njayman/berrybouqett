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
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import Auth from "@scenes/auth";
import Notes from "@scenes/notes";

const PrivateRoute = ({ Component, allowedRoles }) => {
  const isAuthenticated = useIsAuthenticated()();
  const user = useAuthUser()();
  return isAuthenticated && allowedRoles.includes(user.role) ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
};

const Router = () => {
  const isAuthenticated = useIsAuthenticated()();
  const user = useAuthUser()();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <>
                {isAuthenticated ? (
                  user.role === "admin" ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Navigate to="/notes" replace />
                  )
                ) : (
                  <Navigate to="/login" replace />
                )}
              </>
            }
          />
          <Route path="/login" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute Component={Dashboard} allowedRoles={["admin"]} />
            }
          />
          <Route
            path="/notes"
            element={
              <PrivateRoute
                Component={Notes}
                allowedRoles={["admin", "user"]}
              />
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute Component={Products} allowedRoles={["admin"]} />
            }
          />
          <Route
            path="/customers"
            element={
              <PrivateRoute Component={Customers} allowedRoles={["admin"]} />
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute Component={Transactions} allowedRoles={["admin"]} />
            }
          />
          <Route
            path="/geography"
            element={
              <PrivateRoute Component={Geography} allowedRoles={["admin"]} />
            }
          />
          <Route
            path="/overview"
            element={
              <PrivateRoute Component={Overview} allowedRoles={["admin"]} />
            }
          />
          <Route
            path="/daily"
            element={
              <PrivateRoute Component={Daily} allowedRoles={["admin"]} />
            }
          />
          <Route
            path="/monthly"
            element={
              <PrivateRoute Component={Monthly} allowedRoles={["admin"]} />
            }
          />
          <Route
            path="/breakdown"
            element={
              <PrivateRoute Component={Breakdown} allowedRoles={["admin"]} />
            }
          />
          {/* <Route path="/admin" element={<Admin />} />
                <Route path="/performance" element={<Performance />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
