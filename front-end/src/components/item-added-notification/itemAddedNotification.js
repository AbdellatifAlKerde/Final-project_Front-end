import React from "react";
import "./itemAddedNotification.css";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

function ItemAddedNotification() {
  return (
    <div className="item-added-notification">
      Item Added &nbsp;
      <CheckCircleOutlineRoundedIcon style={{ color: "green" }} />
    </div>
  );
}

export default ItemAddedNotification;
