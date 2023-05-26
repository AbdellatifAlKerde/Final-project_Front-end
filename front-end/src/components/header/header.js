import React from "react";
import "./header.css";
import { useEffect, useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import MainButton from "../main-button/MainButton";
import { useNavigate } from "react-router-dom";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import Cookies from "js-cookie";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ProductDataContext } from "../../components/product-data-provider/productDataProvider";

function Header(props) {
  const { cartItems } = useContext(ProductDataContext);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const close = () => {
    document.querySelector(".cart-container").classList.toggle("close");
  };

  const isLoggedIn = Cookies.get("user-token");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      if (scrollPosition > 400) {
        setShowSearchBar(true);
      } else {
        setShowSearchBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let activeStyle = {
    textDecoration: "underline",
  };

  return (
    <header className={`main-header ${isScrolled ? "bg-color" : ""}`}>
      <div className="main-header-logo" onClick={() => navigate("/")}>
        <img src={props.logo} alt="quick bite logo" />
      </div>

      <nav className="header-navigation">
        <NavLink
          to="/products"
          className="main-header-navigation-links"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Products
        </NavLink>
        <NavLink
          to="/restaurants"
          className="main-header-navigation-links"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Restaurants
        </NavLink>
        <Link to="/user-login">
          <MainButton name="Login" className="header-navigation-login" />
        </Link>
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

export default Header;
