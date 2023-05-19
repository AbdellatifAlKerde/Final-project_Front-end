import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import TextField from "../text-field/TextField";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import axios from "axios";
import ProductPopup from "../product-popup/productPopup";
import { useNavigate } from "react-router-dom";

function SearchBar(props) {
  const navigate = useNavigate();
  const [restos, setRestos] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchRestaurants();
    fetchProducts();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/rest`
      );
      setRestos(response.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/product`
      );
      setProducts(response.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchName = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const filteredRestos = restos.filter(
    (resto) =>
      resto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resto.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
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
      <div
        className={
          searchQuery.length > 0 ? "search-bar r-radius" : "search-bar"
        }
        style={props.style}
      >
        <TextField
          type="text"
          style={{
            width: "100%",
            outline: "none",
            boxShadow: "none",
          }}
          labelStyle={{
            width: "100%",
          }}
          value={searchQuery}
          onChange={handleSearchName}
        />
        <button className="search-bar-button">
          <SearchRoundedIcon />
        </button>
        {searchQuery.length > 0 &&
          (filteredRestos.length > 0 || filteredProducts.length > 0 ? (
            <div className="home-search-suggestions">
              {filteredRestos.map((resto) => (
                <div key={resto.id}>
                  {resto.name} - {resto.location}
                </div>
              ))}
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  style={{ cursor: "pointer" }}
                >
                  {product.name}
                </div>
              ))}
            </div>
          ) : (
            <div className="home-search-suggestions">
              <div>No results found.</div>
            </div>
          ))}
      </div>
    </>
  );
}

export default SearchBar;
