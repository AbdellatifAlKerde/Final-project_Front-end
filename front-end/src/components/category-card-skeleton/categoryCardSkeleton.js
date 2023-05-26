import React from "react";
import "./categoryCardSkeleton.css";

function CategoryCardSkeleton(props) {
  return (
    <div className="category-card-skeleton" key={props.key}>
      <div className="category-card-img-skeleton"></div>
      <p></p>
    </div>
  );
}

export default CategoryCardSkeleton;
