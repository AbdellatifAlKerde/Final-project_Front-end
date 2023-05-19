import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function PrivateRoutes() {
  const isSuper = localStorage.getItem("isSuper");
  const isAuthenticated = Cookies.get("admin-token");
  return isAuthenticated && isSuper === "true" ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" />
  );
}

export default PrivateRoutes;
