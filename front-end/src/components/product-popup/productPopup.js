import React from "react";
import "./productPopup.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MainButton from "../main-button/MainButton";

function ProductPopup(props) {
  return (
    <div className="overlay">
      <div className="product-popup-container">
        <div className="product-popup-close-btn" onClick={props.onClickClose}>
          <CloseRoundedIcon />
        </div>
        <div className="product-popup-img">
          <img src={props.src} alt={props.alt} />
        </div>
        <div className="product-popup-desc">
          <div>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            <p>{props.price}$</p>
          </div>
          <div>
            <MainButton style={{ width: "100%" }} name="ADD TO CART" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPopup;
