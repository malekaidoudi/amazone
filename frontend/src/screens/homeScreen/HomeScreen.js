import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./homeScreen-style.css";
import logger from "use-reducer-logger";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, isLoading: true };
    case "FETCH_SUCCESS":
      return { ...state, isLoading: false, products: action.payload };
    case "FETCH_FAIL":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ products, isLoading, error }, dispatch] = useReducer(
    logger(reducer),
    {
      products: [],
      isLoading: true,
      error: "",
    }
  );
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({
          type: "FETCH_SUCCESS",
          payload: result.data,
        });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: err.message,
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => (
            <div key={product.slug} className="product">
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <Link to={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </Link>
              <p>
                <strong>{product.price}€</strong>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
