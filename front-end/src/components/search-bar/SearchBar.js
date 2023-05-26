import React, { useState, useEffect, useContext } from "react";
import "./SearchBar.css";
import TextField from "../text-field/TextField";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProductDataContext } from "../../components/product-data-provider/productDataProvider";

function SearchBar(props) {
  const { addToCartPopup, handleCategoryClick, handleRestaurantClick } =
    useContext(ProductDataContext);
  const navigate = useNavigate();
  const [restos, setRestos] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [countItems, setCountItems] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

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
    product.category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
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
          placeholder="Food, Drinks, Restaurant, etc..."
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
                <div
                  key={resto.id}
                  onClick={() => {
                    handleRestaurantClick(filteredRestos);
                    navigate("/restaurants");
                    setSearchQuery("");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {resto.name} - {resto.location}
                </div>
              ))}
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    handleCategoryClick(product.category._id);
                    navigate("/products");
                    setSearchQuery("");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {product.name} - {product.restaurant_id.name}
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
