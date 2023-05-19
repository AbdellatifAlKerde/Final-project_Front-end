import axios from "axios";
import React, { useState, useEffect, createContext } from "react";

// Create a new context for the product data
const ProductDataContext = createContext();

function ProductDataProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/product`
      );
      setProducts(response.data.items);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ProductDataContext.Provider value={{ products }}>
      {children}
    </ProductDataContext.Provider>
  );
}

export { ProductDataContext, ProductDataProvider };
