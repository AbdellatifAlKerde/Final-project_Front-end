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
import RestaurantPage from "./pages/restaurants-page/restaurantPage";
import RestaurantDetails from "./pages/restaurant-details/restaurantDetails";
import NotFoundPage from "./pages/not-found-page/notFoundPage";
import OwnerRegister from "./pages/owner-register/ownerRegister";
import logo from "./assets/images/QUICK BITE LOGO.svg";
import UserProfile from "./pages/user-profile/userProfile";

function App() {
  const location = useLocation();
  const isUserLoginPath = location.pathname === "/user-login";
  const isAdminLoginPath = location.pathname === "/admin-login";
  const isProductPath = location.pathname === "/products";
  const isAdminDashboardPath = location.pathname === "/admin-dashboard";
  const isOwnerDashboardPath = location.pathname === "/owner-dashboard";
  const isDashboardPath = isAdminDashboardPath || isOwnerDashboardPath;
  const isRestaurantPath = location.pathname === "/restaurants";
  const isRestaurantDetailsPath = location.pathname.startsWith("/restaurant");
  const isOwnerRegisterPath = location.pathname === "/owner-register";

  const isProductUserLoginPath =
    isUserLoginPath ||
    isProductPath ||
    isAdminLoginPath ||
    isDashboardPath ||
    isRestaurantPath ||
    isRestaurantDetailsPath ||
    isOwnerRegisterPath;
  const isUserAdminLoginPath =
    isUserLoginPath ||
    isAdminLoginPath ||
    isDashboardPath ||
    isOwnerRegisterPath;
  return (
    <ProductDataProvider>
      <div className="App">
        {!isProductUserLoginPath && <Header logo={logo} />}
        <Routes>
          <Route>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/user-login" element={<UserLoginPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/restaurants" element={<RestaurantPage />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
            <Route path="/owner-register" element={<OwnerRegister />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/*" element={<NotFoundPage />} />
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
