import React, { useState } from "react";
import "./productCard.css";

function ProductCard(props) {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 600);
  };

  return (
    <div className="product-card" style={props.style} onClick={props.onClick} key={props.key}>
      <div className="product-card-img">
        <img src={props.src} alt={props.alt} />
      </div>
      <div className="product-card-desc">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <div className="product-price-add">
          <div>${props.price}</div>
          <div onClick={props.onClickAddToCart}>+{isAdded && <p>+1</p>}</div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
