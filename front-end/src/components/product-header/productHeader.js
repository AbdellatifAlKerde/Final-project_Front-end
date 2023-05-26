import React, { useContext, useEffect, useState } from "react";
import "./productHeader.css";
import SearchBar from "../search-bar/SearchBar";
import MainButton from "../main-button/MainButton";
import { Link, useNavigate, NavLink } from "react-router-dom";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { ProductDataContext } from "../../components/product-data-provider/productDataProvider";
import Cookies from "js-cookie";
import logo from "../../assets/images/QUICK BITE LOGO.svg";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import profileImage from "../../assets/images/profile-icon.jpeg";

function ProductHeader() {
  const { cartItems, user } = useContext(ProductDataContext);
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);

  const isAuthenticated = Cookies.get("user-token");

  const close = () => {
    document.querySelector(".cart-container").classList.toggle("close");
  };

  let activeStyle = {
    textDecoration: "underline",
  };

  return (
    <header className="product-page-header">
      <div className="product-page-logo" onClick={() => navigate("/")}>
        <img src={logo} alt="quick bite logo" />
      </div>
      <div className="product-page-search-bar">
        <SearchBar style={{ width: "100%" }} />
      </div>
      <nav className="header-navigation">
        <NavLink
          to="/products"
          className={`main-header-navigation-links ${({ isActive }) =>
            isActive ? "active" : ""}`}
        >
          Products
        </NavLink>
        <NavLink
          to="/restaurants"
          className={`main-header-navigation-links ${({ isActive }) =>
            isActive ? "active" : ""}`}
        >
          Restaurants
        </NavLink>
        {isAuthenticated ? (
          <div
            className="header-user-profile"
            onClick={() => navigate("/user-profile")}
          >
            <img src={profileImage} alt="Profile image" />
            <span>{user && user.username}</span>
          </div>
        ) : (
          <Link to="/user-login">
            <MainButton name="Login" className="header-navigation-login" />
          </Link>
        )}
        <Link to="/owner-register">
          <MainButton
            name="Become a Partner"
            className="header-navigation-login"
          />
        </Link>

        <div className="product-header-add-to-cart" onClick={close}>
          <ShoppingCartRoundedIcon style={{ transform: "scale(1.3)" }} />
          {cartItems.length > 0 && (
            <div className="product-header-add-to-cart-notif"></div>
          )}
        </div>
      </nav>
      {!navOpen ? (
        <div
          className="mobile-header-navigation"
          onClick={() => setNavOpen(true)}
        >
          <MenuRoundedIcon />
        </div>
      ) : (
        <div
          className="mobile-header-navigation"
          onClick={() => setNavOpen(false)}
        >
          <CloseRoundedIcon />
        </div>
      )}
      <div
        className={`mobile-navigation-dopdown-overlay ${
          !navOpen ? "open" : ""
        }`}
        style={{ top: 0 }}
        onClick={() => setNavOpen(false)}
      >
        <div className={`mobile-navigation-dropdown ${!navOpen ? "open" : ""}`}>
          <div className="product-header-add-to-cart" onClick={close}>
            <ShoppingCartRoundedIcon style={{ transform: "scale(1.3)" }} />
          </div>
          <NavLink to="/products" className="main-header-navigation-links">
            Products
          </NavLink>
          <NavLink to="/restaurants" className="main-header-navigation-links">
            Restaurants
          </NavLink>
          <Link to="/user-login">
            <MainButton
              name="Login"
              className="header-navigation-login"
              style={{ width: "100%" }}
            />
          </Link>
          <Link to="/owner-register">
            <MainButton
              name="Become a Partner"
              className="header-navigation-login"
              style={{ width: "100%" }}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default ProductHeader;
