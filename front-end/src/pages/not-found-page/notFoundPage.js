import React from "react";
import "./notFoundPage.css";
import notFoundImg from "../../assets/images/404 Error-amico.svg";
import MainButton from "../../components/main-button/MainButton";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="not-found-page">
      <div className="not-found-page-container">
        <div className="not-found-image">
          <img src={notFoundImg} alt="Not found page" />
        </div>
        <div>
          The page you are looking for might have removed, had it's name changed
          or is temporarily unavailable.
        </div>
        <div>
          <MainButton name="GO BACK" onClick={() => navigate(-1)} />
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
