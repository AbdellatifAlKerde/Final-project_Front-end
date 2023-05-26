import React from "react";
import "./footer.css";
import logo from "../../assets/images/QUICK BITE LOGO.svg";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <div className="main-footer">
      <div className="footer-container">
        <a className="footer-logo" href="/">
          <img src={logo} />
        </a>
        <nav className="footer-nav-links footer-flex">
          <h2>Pages</h2>
          <NavLink
            to="/"
            className={`main-header-navigation-links ${({ isActive }) =>
              isActive ? "active" : ""}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={`main-header-navigation-links ${({ isActive }) =>
              isActive ? "active" : ""}`}
          >
            Products
          </NavLink>
          <NavLink
            to="/restaurants"
            className={`main-header-navigation-links ${({ isActive }) =>
              isActive ? "active" : ""}`}
          >
            Restaurants
          </NavLink>
          <NavLink
            to="/user-login"
            className={`main-header-navigation-links ${({ isActive }) =>
              isActive ? "active" : ""}`}
          >
            Login
          </NavLink>
          <NavLink
            to="/owner-register"
            className={`main-header-navigation-links ${({ isActive }) =>
              isActive ? "active" : ""}`}
          >
            Become a partner
          </NavLink>
        </nav>
        <div className="footer-socials footer-flex">
          <h2>Follow Us On</h2>
          <a
            href="https://instagram.com/abdellatifalkerde?igshid=OGQ5ZDc2ODk2ZA=="
            target="_blank"
          >
            <span>
              <FaInstagram />
            </span>
            Instagram
          </a>
          <a href="https://github.com/AbdellatifAlKerde" target="_blank">
            <span>
              <FaGithub />
            </span>
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/abdellatif-al-kerde"
            target="_blank"
          >
            <span>
              <FaLinkedin />
            </span>
            Linked In
          </a>
        </div>
      </div>
      <div className="footer-privacy">© 2023 Quick Bite Inc.</div>
    </div>
  );
}

export default Footer;
