import React, { useContext } from "react";
import "./cartContainer.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CartItemsCard from "../cart-items-card/cartItemsCard";
import { ProductDataContext } from "../../components/product-data-provider/productDataProvider";

function CartContainer() {
  const close = () => {
    document.querySelector(".cart-container").classList.toggle("close");
  };
  return (
    <div className="cart-container close">
      <div className="cart-content">
        <h2 className="cart-heading">My Order</h2>
        <div className="cart-close-btn" onClick={close}>
          <CloseRoundedIcon />
        </div>
        <div className="cart-items">
          <CartItemsCard
            src="https://img.freepik.com/free-photo/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg?w=1380&t=st=1684328417~exp=1684329017~hmac=f97c20ef9bc70e731282f42a3dd21550b8ffae9c67a2afe7e9629c2d74f35bb1"
            name="Pizza"
            price="10"
          />
        </div>
      </div>
    </div>
  );
}

export default CartContainer;
