import React from "react";
import "./productHeader.css";
import SearchBar from "../search-bar/SearchBar";
import MainButton from "../main-button/MainButton";
import { Link } from "react-router-dom";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

function ProductHeader() {
  const close = () => {
    document.querySelector(".cart-container").classList.toggle("close");
  };
  return (
    <header className="product-page-header">
      <div className="product-page-logo">
        <div style={{ fontSize: "3rem" }}>Quick Bite</div>
      </div>
      <SearchBar style={{ width: "60%" }} />
      <nav className="header-navigation">
        <Link to="/user-login">
          <MainButton name="Login" className="header-navigation-login" />
        </Link>
        <div className="product-header-add-to-cart" onClick={close}>
          <ShoppingCartRoundedIcon style={{ transform: "scale(1.3)" }} />
        </div>
      </nav>
    </header>
  );
}

export default ProductHeader;
