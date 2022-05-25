import axios from "axios";
import React, { useContext } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import MessageBox from "../../components/MessageBox";
import { Store } from "../../Store";

function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const navigate = useNavigate();
  const removeItemHandler = (item) => {
    ctxDispatch({
      type: "REMOVE-ITEM-CART",
      payload: { ...item },
    });
  };
  const updateQuantityHandler = async (item, quantity) => {
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
  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty...<Link to="/">Go to shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((el) => (
                <ListGroup.Item key={el.id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={el.image}
                        alt={el.name}
                        className="img-fluid rounded img-thumbnail"
                      />
                      <Link to={`products/${el.slug}`}>{el.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        disabled={el.quantity === 1}
                        onClick={() =>
                          updateQuantityHandler(el, el.quantity - 1)
                        }
                      >
                        <i className="fas fa-minus-circle" />
                      </Button>{" "}
                      <span>
                        <strong>{el.quantity}</strong>
                      </span>{" "}
                      <Button
                        variant="light"
                        disabled={el.quantity === el.countInStock}
                        onClick={() =>
                          updateQuantityHandler(el, el.quantity + 1)
                        }
                      >
                        <i className="fas fa-plus-circle icon" />
                      </Button>
                    </Col>
                    <Col md={3}>
                      <strong>{el.price}€</strong>
                    </Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => removeItemHandler(el)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items):
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}€
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartScreen;
