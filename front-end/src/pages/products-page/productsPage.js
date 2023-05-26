import React, { useContext, useState } from "react";
import ProductHeader from "../../components/product-header/productHeader";
import ProductCard from "../../components/product-card/productCard";
import { ProductDataContext } from "../../components/product-data-provider/productDataProvider";
import CartContainer from "../../components/cart-container/cartContainer";
import "./productsPage.css";
import ProductPopup from "../../components/product-popup/productPopup";
import ProductCardSkeleton from "../../components/product-card-skeleton/productCardSkeleton";
import ItemAddedNotification from "../../components/item-added-notification/itemAddedNotification";
import CategoryCard from "../../components/categoryCard/categoryCard";
import allProductsImg from "../../assets/images/All-products.png";
import SearchBar from "../../components/search-bar/SearchBar";
import Header from "../../components/header/header";
import emptyCart from "../../assets/images/cart-container-icon.svg";
import CategoryCardSkeleton from "../../components/category-card-skeleton/categoryCardSkeleton";

function ProductsPage() {
  const {
    products,
    isLoading,
    addToCart,
    addToCartPopup,
    categories,
    handleCategoryClick,
    handleGetAllProductsClick,
    selectedCategory,
  } = useContext(ProductDataContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [countItems, setCountItems] = useState(1);
  const handleAddToCartPopup = (product) => {
    addToCartPopup(product, countItems);
    handleClick();
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleClick = () => {
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const close = () => {
    document.querySelector(".cart-container").classList.toggle("close");
  };

  return (
    <main className="products-page">
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
      <div className="product-page-search-bar-mobile">
        <SearchBar style={{ width: "100%" }} />
      </div>
      <section className="product-page-category-section">
        <CategoryCard
          className={`category-card ${
            !selectedCategory ? "category-card-selected" : ""
          }`}
          src={allProductsImg}
          name="All"
          alt="all products image"
          onClick={() => handleGetAllProductsClick()}
        />
        {categories.map((cat) => (
          <CategoryCard
            className={`category-card ${
              selectedCategory === cat._id ? "category-card-selected" : ""
            }`}
            key={cat._id}
            src={`${process.env.REACT_APP_API_URL}/${cat.image}`}
            name={cat.name}
            alt={cat.name}
            onClick={() => handleCategoryClick(cat._id)}
          />
        ))}
        {categories.length === 0 &&
          Array.from({ length: 10 }).map((_, index) => (
            <CategoryCardSkeleton key={index} />
          ))}
      </section>
      <CartContainer />
      <div className="product-page-cards">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : products.map((product) => (
              <ProductCard
                key={product._id}
                src={`${process.env.REACT_APP_API_URL}/${product.image}`}
                alt={product.name}
                title={product.name}
                description={product.description}
                price={product.price}
                onClick={() => handleProductClick(product)}
                // onClickAddToCart={() => handleAddToCart(product)}
              />
            ))}
        {products.length === 0 && (
          <div className="no-products-found">
            <div>
              <img src={emptyCart} alt="Empty cart" />
            </div>
            <div className="no-products-found-msg">
              No products found in this category...
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default ProductsPage;
