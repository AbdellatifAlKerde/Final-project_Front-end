import React, { useContext, useEffect, useState } from "react";
import "./restaurantDetails.css";
import { useParams } from "react-router-dom";
import { ProductDataContext } from "../../components/product-data-provider/productDataProvider";
import ProductHeader from "../../components/product-header/productHeader";
import ProductCard from "../../components/product-card/productCard";
import ProductCardSkeleton from "../../components/product-card-skeleton/productCardSkeleton";
import CartContainer from "../../components/cart-container/cartContainer";
import ItemAddedNotification from "../../components/item-added-notification/itemAddedNotification";
import ProductPopup from "../../components/product-popup/productPopup";
import Footer from "../../components/footer/footer";

function RestaurantDetails() {
  const { id } = useParams();
  const { restaurants, categories, products, addToCart, addToCartPopup } =
    useContext(ProductDataContext);
  const [restaurant, setRestaurant] = useState(null);
  const [restoProducts, setRestoProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [countItems, setCountItems] = useState(1);

  const handleAddToCartPopup = (product) => {
    addToCartPopup(product, countItems);
    handleClick();
  };

  const handleClick = () => {
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  useEffect(() => {
    const filteredRestaurants = restaurants.filter((resto) =>
      resto._id.includes(id)
    );

    if (filteredRestaurants.length > 0) {
      setRestaurant(filteredRestaurants[0]);
    }
  }, [id, restaurants]);

  useEffect(() => {
    const filteredProducts = products.filter(
      (product) => product.restaurant_id._id === id
    );

    if (filteredProducts.length > 0) {
      setRestoProducts(filteredProducts);
    }
  }, [id, products]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  const close = () => {
    document.querySelector(".cart-container").classList.toggle("close");
  };

  return (
    <div className="restaurant-details-page">
      {selectedProduct && (
        <ProductPopup
          src={`${process.env.REACT_APP_API_URL}/${selectedProduct.image}`}
          alt={selectedProduct.name}
          title={selectedProduct.name}
          description={selectedProduct.description}
          price={selectedProduct.price}
          onClickClose={() => {
            setSelectedProduct(null);
            setCountItems(1);
          }}
          onClickAddToCart={() => {
            handleAddToCartPopup(selectedProduct);
            close();
            setSelectedProduct(null);
            setCountItems(1);
          }}
          buttonName={`Add ${countItems} to cart  • ${
            countItems * selectedProduct.price
          }$`}
          inputOnChange={(e) => setCountItems(e.target.value)}
          inputDefaultValue={1}
        />
      )}
      <ProductHeader />
      <CartContainer />
      <div className="restaurant-details-page-hero">
        <img
          src={`${process.env.REACT_APP_API_URL}/${restaurant.image}`}
          alt={restaurant.name}
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="restaurant-details-page-desc">
        <div className="restaurant-details-title">
          <h2>
            {restaurant.name} ({restaurant.location})
          </h2>
          <div>{restaurant.description}</div>
        </div>
        {restoProducts ? (
          <section className="restaurant-details-cat-prod">
            <div className="restaurant-categories">
              <div className="restaurant-categories-links">
                {categories.map(
                  (cat) =>
                    restoProducts.filter(
                      (product) =>
                        product.category.name.toLowerCase() ===
                        cat.name.toLowerCase()
                    ).length > 0 && (
                      <a href={`#${cat.name}`} key={cat._id}>
                        {cat.name}
                      </a>
                    )
                )}
              </div>
            </div>
            <div className="restaurant-products">
              {categories.map(
                (cat) =>
                  restoProducts.filter(
                    (product) =>
                      product.category.name.toLowerCase() ===
                      cat.name.toLowerCase()
                  ).length > 0 && (
                    <div className="restaurant-products-by-cat" id={cat.name}>
                      <h2 className="restaurant-products-by-cat-title">
                        {cat.name}
                      </h2>
                      <div className="restaurant-products-by-cat-cards">
                        {!restoProducts || restoProducts.length === 0
                          ? Array.from({ length: 10 }).map((_, index) => (
                              <ProductCardSkeleton key={index} />
                            ))
                          : restoProducts
                              .filter(
                                (product) =>
                                  product.category.name.toLowerCase() ===
                                  cat.name.toLowerCase()
                              )
                              .map((prod) => (
                                <ProductCard
                                  src={`${process.env.REACT_APP_API_URL}/${prod.image}`}
                                  title={prod.name}
                                  description={prod.description}
                                  price={prod.price}
                                  onClick={() => handleProductClick(prod)}
                                  // onClickAddToCart={() => handleAddToCart(prod)}
                                  style={{ flex: "1 1 300px" }}
                                />
                              ))}
                      </div>
                    </div>
                  )
              )}
            </div>
          </section>
        ) : (
          <section className="no-items-message">
            {restaurant.name} doesn't have items yet...
          </section>
        )}
        <div></div>
      </div>
    </div>
  );
}

export default RestaurantDetails;
