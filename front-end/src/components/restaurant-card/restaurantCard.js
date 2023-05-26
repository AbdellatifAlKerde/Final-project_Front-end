import React from "react";
import "./restaurantCard.css";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

function RestaurantCard(props) {
  return (
    <div className="product-card" onClick={props.onClick} key={props.key}>
      <div className="product-card-img">
        <img src={props.src} alt={props.alt} />
      </div>
      <div className="product-card-desc">
        <h2>{props.name}</h2>
        <p>{props.description}</p>
        <span>
          <LocationOnRoundedIcon style={{ color: "var(--accent-color)" }} />
          &nbsp;
          {props.location}
        </span>
      </div>
    </div>
  );
}

export default RestaurantCard;
