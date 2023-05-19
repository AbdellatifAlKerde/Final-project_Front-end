import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/home-page/homePage";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import UserLoginPage from "./pages/user-login-page/userLoginPage";
import ProductsPage from "./pages/products-page/productsPage";
import { ProductDataProvider } from "./components/product-data-provider/productDataProvider";
import AdminLoginPage from "./pages/admin-login-page/adminLoginPage";
import AdminDashboard from "./pages/admin-dashboard/adminDashboard";
import RestoOwnerDashboard from "./pages/resto-owner-dashboard/restoOwnerDashboard";
import Unauthorized from "./pages/unauthorized/unauthorized";
import PrivateRoutes from "./utils/privateRoutes";
import OwnerPrivateRoutes from "./utils/ownerPrivateRoutes";

function App() {
  const location = useLocation();
  const isUserLoginPath = location.pathname === "/user-login";
  const isAdminLoginPath = location.pathname === "/admin-login";
  const isProductPath = location.pathname === "/products";
  const isAdminDashboardPath = location.pathname === "/admin-dashboard";
  const isOwnerDashboardPath = location.pathname === "/owner-dashboard";
  const isDashboardPath = isAdminDashboardPath || isOwnerDashboardPath;

  const isProductUserLoginPath =
    isUserLoginPath || isProductPath || isAdminLoginPath || isDashboardPath;
  const isUserAdminLoginPath =
    isUserLoginPath || isAdminLoginPath || isDashboardPath;
  return (
    <ProductDataProvider>
      <div className="App">
        {!isProductUserLoginPath && <Header />}
        <Routes>
          <Route>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/user-login" element={<UserLoginPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Route>
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>
          <Route path="/" element={<OwnerPrivateRoutes />}>
            <Route path="/owner-dashboard" element={<RestoOwnerDashboard />} />
          </Route>
        </Routes>
        {!isUserAdminLoginPath && <Footer />}
      </div>
    </ProductDataProvider>
  );
}

export default App;
