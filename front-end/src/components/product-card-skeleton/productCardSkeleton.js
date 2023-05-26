import React, { useState } from "react";
import "./productCardSkeleton.css";

function ProductCardSkeleton(props) {
  return (
    <div className="product-card product-card-skeleton" key={props.key}>
      <div className="product-card-img skeleton-animation"></div>
      <div className="product-card-desc product-card-desc-skeleton">
        <h2 className="skeleton-animation">{props.title}</h2>
        <p className="skeleton-animation"></p>
        <div className="product-price-add-skeleton">
          <div className="skeleton-animation"></div>
          <div className="skeleton-animation"></div>
        </div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
