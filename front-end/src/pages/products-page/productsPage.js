import React, { useContext, useState } from "react";
import ProductHeader from "../../components/product-header/productHeader";
import ProductCard from "../../components/product-card/productCard";
import { ProductDataContext } from "../../components/product-data-provider/productDataProvider";
import CartContainer from "../../components/cart-container/cartContainer";
import "./productsPage.css";
import ProductPopup from "../../components/product-popup/productPopup";

function ProductsPage() {
  const { products, addToCart } = useContext(ProductDataContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
    console.log("Product added to cart:", product);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
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
          onClickClose={() => setSelectedProduct(null)}
        />
      )}
      <ProductHeader />
      <CartContainer />
      <div className="product-page-cards">
        {products.map((product) => (
          <ProductCard
            src={`${process.env.REACT_APP_API_URL}/${product.image}`}
            alt={product.name}
            title={product.name}
            description={product.description}
            price={product.price}
            onClick={() => handleProductClick(product)}
            // onClickAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </main>
  );
}

export default ProductsPage;
