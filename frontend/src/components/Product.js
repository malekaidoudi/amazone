import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Rating from "./Rating";
import { Store } from "../Store";
import axios from "axios";

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addCartHandler = async (item) => {
    const existItem = cartItems.find((el) => el._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "ADD-TO-CART",
      payload: { ...item, quantity },
    });
  };
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text> {product.price}€</Card.Text>
        <div className="d-grid">
          {product.countInStock === 0 ? (
            <Button disabled>Out of Stock</Button>
          ) : (
            <Button type="submit" onClick={() => addCartHandler(product)}>
              Add to Cart
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default Product;
