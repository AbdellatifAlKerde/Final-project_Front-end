import React from "react";
import "./MainButton.css";

function MainButton(props) {
  return (
    <button
      className="main-button"
      style={props.style}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.name}
      {props.children}
    </button>
  );
}

export default MainButton;
