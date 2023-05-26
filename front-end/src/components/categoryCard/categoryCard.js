import React from "react";
import "./categoryCard.css";

function CategoryCard(props) {
  return (
    <div className={props.className} key={props.key} onClick={props.onClick}>
      <div className="category-card-img">
        <img src={props.src} alt={props.alt} />
      </div>
      <p>{props.name}</p>
    </div>
  );
}

export default CategoryCard;
