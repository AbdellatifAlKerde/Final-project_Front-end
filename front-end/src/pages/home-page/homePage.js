import React from "react";
import heroSectionImg from "../../assets/images/home-page-hero-section.svg";
import "./homePage.css";
import SearchBar from "../../components/search-bar/SearchBar";
import card1 from "../../assets/images/group photo-amico.svg";
import card2 from "../../assets/images/Delivery-amico.svg";
import card3 from "../../assets/images/Waiters-amico.svg";
import CartContainer from "../../components/cart-container/cartContainer";

function HomePage() {
  return (
    <div className="home-page">
      <CartContainer />
      <section className="home-page-hero-section">
        <div className="hero-section-desc hero-section-content">
          <h1>Welcome To The Fastest Delivery Ever</h1>
          <SearchBar style={{ width: "90%" }} />
        </div>
        <div className="hero-section-image hero-section-content">
          <img
            src={heroSectionImg}
            alt="Delivery Driver"
            width="100%"
            height="100%"
          />
        </div>
      </section>
      <section className="home-page-service-section">
        <div className="home-page-service-section-heading">
          <h3>what we serve</h3>
          <h2>Your Favourite Food Delivery Partner</h2>
        </div>
        <div className="cards">
          <div className="card">
            <div className="card-image">
              <img src={card1} alt="man photo" />
            </div>
            <div className="card-desc">
              <h2>Easy To Order</h2>
              <p>You only need a few steps in ordering food.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-image">
              <img src={card2} alt="Delivery man photo" />
            </div>
            <div className="card-desc">
              <h2>Fastest Delivery</h2>
              <p>Delivery that is always ontime even faster.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-image">
              <img src={card3} alt="waiter photo" />
            </div>
            <div className="card-desc">
              <h2>Best Quality</h2>
              <p>Not only fast for us, quality is also number one.</p>
            </div>
          </div>
        </div>
      </section>
      {/* <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d210307.4748130264!2d36.04394648513813!3d34.5521806784511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1522398ea415e347%3A0x3bfee2bc9c74f81b!2sAkkar%20Governorate!5e0!3m2!1sen!2slb!4v1684006519840!5m2!1sen!2slb"
        width="100%"
        height="600"
        style={{ border: 0 }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe> */}
    </div>
  );
}

export default HomePage;
