import React from "react";
import "./cartItemsCard.css";

function CartItemsCard(props) {
  return (
    <div className="cart-items-card">
      <div className="cart-items-card-img">
        <img src={props.src} alt={props.alt} />
      </div>
      <p>{props.name}</p>
      <p>{props.price}$</p>
    </div>
  );
}

export default CartItemsCard;
