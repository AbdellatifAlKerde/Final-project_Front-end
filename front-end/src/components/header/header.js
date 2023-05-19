import React from "react";
import "./header.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainButton from "../main-button/MainButton";
import { useNavigate } from "react-router-dom";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import Cookies from "js-cookie";

function Header() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

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

  return (
    <header className={`main-header ${isScrolled ? "bg-color" : ""}`}>
      <div className="main-header-logo" onClick={() => navigate("/")}>
        Quick Bite
      </div>
      {/* {showSearchBar ? (
        <SearchBar
          style={{ width: "60%", backgroundColor: "var(--primary-color)" }}
        />
      ) : (
        ""
      )} */}
      <nav className="header-navigation">
        {isLoggedIn && (
          <div className="product-header-add-to-cart" onClick={close}>
            <ShoppingCartRoundedIcon style={{ transform: "scale(1.3)" }} />
          </div>
        )}
        <Link to="/user-login">
          <MainButton name="Login" className="header-navigation-login" />
        </Link>
        <MainButton name="Signup" className="header-navigation-login" />
      </nav>
    </header>
  );
}

export default Header;
