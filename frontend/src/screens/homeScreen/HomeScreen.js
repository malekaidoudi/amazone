import React, { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import { Col, Row } from "react-bootstrap";
import ProductComponent from "../../components/ProductComponent";
import { Helmet } from "react-helmet-async";
import "./homeScreen-style.css";

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
      <Helmet>
        <title>Amazone</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <ProductComponent product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
