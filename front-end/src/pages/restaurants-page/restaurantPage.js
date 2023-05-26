import React, { useContext } from "react";
import "./restaurantPage.css";
import { ProductDataContext } from "../../components/product-data-provider/productDataProvider";
import ProductHeader from "../../components/product-header/productHeader";
import RestaurantCard from "../../components/restaurant-card/restaurantCard";
import { useNavigate } from "react-router-dom";
import ProductCardSkeleton from "../../components/product-card-skeleton/productCardSkeleton";
import CartContainer from "../../components/cart-container/cartContainer";

function RestaurantPage() {
  const navigate = useNavigate();
  const { restaurants, isLoading } = useContext(ProductDataContext);
  return (
    <div className="restaurants-page">
      <ProductHeader />
      <section className="restaurant-page-hero">
        <h2>Discover Our Restaurants</h2>
      </section>
      <CartContainer />
      <section className="restaurants-page-cards-section">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : restaurants.map((rest) => (
              <RestaurantCard
                key={rest._id}
                src={`${process.env.REACT_APP_API_URL}/${rest.image}`}
                name={rest.name}
                description={rest.description}
                location={rest.location}
                onClick={() => navigate(`/restaurant/${rest._id}`)}
              />
            ))}
      </section>
    </div>
  );
}

export default RestaurantPage;
