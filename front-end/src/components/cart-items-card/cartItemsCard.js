import React from "react";
import "./cartItemsCard.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function CartItemsCard(props) {
  return (
    <div className="cart-items-card">
      <div className="cart-items-card-img">
        <img src={props.src} alt={props.alt} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "calc(100% - 120px)",
          paddingLeft: "1rem",
        }}
      >
        <p>
          <input
            type="number"
            min={1}
            max={100}
            name={props.inputName}
            defaultValue={props.inputDefaultValue}
            onChange={props.inputOnChange}
            onBlur={props.inputOnBlur}
            value={props.inputValue}
          />
        </p>
        <p>{props.name}</p>
        <p>{props.price}$</p>
      </div>
      <div className="cart-items-card-close-btn" onClick={props.onClickRemove}>
        <CloseRoundedIcon />
      </div>
    </div>
  );
}

export default CartItemsCard;
