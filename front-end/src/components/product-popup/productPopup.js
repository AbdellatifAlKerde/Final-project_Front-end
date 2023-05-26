import React, { useContext } from "react";
import "./productPopup.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MainButton from "../main-button/MainButton";
import { ProductDataContext } from "../../components/product-data-provider/productDataProvider";

function ProductPopup(props) {
  const { addToCart } = useContext(ProductDataContext);

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
          <div className="product-popup-select">
            <input
              type="number"
              min={1}
              max={100}
              name={props.inputName}
              defaultValue={props.inputDefaultValue}
              onChange={props.inputOnChange}
            />
          </div>
          <div>
            <MainButton
              style={{ width: "100%" }}
              name={props.buttonName}
              onClick={props.onClickAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPopup;
