import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function OwnerPrivateRoutes() {
  const isAuthenticated = Cookies.get("admin-token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/unauthorized" />;
}

export default OwnerPrivateRoutes;
