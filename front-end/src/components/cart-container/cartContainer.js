import React, { useContext, useState, useEffect } from "react";
import "./cartContainer.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CartItemsCard from "../cart-items-card/cartItemsCard";
import { ProductDataContext } from "../../components/product-data-provider/productDataProvider";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import Tooltip from "@mui/material/Tooltip";
import MainButton from "../main-button/MainButton";
import EmptyCartImage from "../../assets/images/cart-container-icon.svg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Spinner from "../spinner/spinner";

function CartContainer() {
  const navigate = useNavigate();
  const isAuthenticated = Cookies.get("user-token");
  const {
    cartItems,
    removeFromCart,
    clearCart,
    totalPrice,
    editCartItemQuantity,
  } = useContext(ProductDataContext);
  const [countItems, setCountItems] = useState(1);
  const handleAddToCartPopup = (productId) => {
    editCartItemQuantity(productId, countItems);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (cartItems) {
      setProducts(cartItems);
    }
  }, [cartItems]);

  const close = () => {
    document.querySelector(".cart-container").classList.toggle("close");
  };

  const startShopping = () => {
    close();
    navigate("/products");
  };

  const submitOrder = async (e) => {
    const orderForm = {
      user: Cookies.get("user-id"),
      products,
      total: totalPrice,
    };
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/order`,
        orderForm
      );
      console.log(response.data);
      setIsLoading(false);
      setProducts([]);
      localStorage.removeItem("cartItems");
      clearCart();
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="cart-container close" id="cart-container">
        <div className="cart-close-btn" onClick={close}>
          <CloseRoundedIcon />
        </div>
        {cartItems.length > 0 ? (
          <div className="cart-content">
            <div className="cart-header">
              <h2 className="cart-heading">My Orders</h2>
              <div onClick={() => clearCart()}>
                <Tooltip title="Clear cart" placement="left">
                  <DeleteOutlineRoundedIcon />
                </Tooltip>
              </div>
            </div>
            <div className="cart-items">
              {cartItems.map((item) => (
                <CartItemsCard
                  src={`${process.env.REACT_APP_API_URL}/${item.image}`}
                  alt={item.name}
                  name={item.name}
                  price={item.price}
                  // inputValue={item.quantity}
                  inputDefaultValue={item.quantity}
                  onClickRemove={() => removeFromCart(item._id)}
                  inputOnChange={(e) => {
                    setCountItems(e.target.value);
                  }}
                  inputOnBlur={() => handleAddToCartPopup(item._id)}
                />
              ))}
            </div>
            <div className="cart-container-total-price">
              <p>Total Amount:</p>
              <p>{totalPrice}$</p>
            </div>
            <div className="cart-container-button">
              <MainButton
                name={
                  isLoading ? "" : isAuthenticated ? "Order" : "Login to order"
                }
                style={{ width: "100%" }}
                onClick={() => {
                  isAuthenticated ? submitOrder() : navigate("/user-login");
                }}
                disabled={isLoading}
              >
                {isLoading && <Spinner />}
              </MainButton>
            </div>
          </div>
        ) : (
          <div className="cart-container-when-empty">
            <div className="empty-cart-image">
              <img src={EmptyCartImage} alt="cart with items image" />
            </div>
            <div className="empty-cart-desc">
              <p>
                Once you add items from a restaurant or store, your cart will
                appear here.
              </p>
              <MainButton
                name="Start Shopping"
                onClick={startShopping}
                style={{ paddingBlock: ".5rem" }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CartContainer;
