import React from "react";
import "./unauthorized.css";
import MainButton from "../../components/main-button/MainButton";
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="unauthorized-page">
      <div className="unauthorized-page-container">
        <h2>unauthorized</h2>
        <div>401 - You don't have access to this page</div>
        <div>This page is not publicly available.</div>
        <div>To access this page please login first.</div>
        <Link to="/admin-login">
          <MainButton name="Login" />
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;
