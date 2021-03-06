import React, { useContext, useEffect, useReducer } from "react";
import CheckoutComponents from "../components/checkoutComponents";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Store } from "../Store";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getError } from "../utils";
import axios from "axios";
import LoadingBox from "../components/LoadingBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE-REQUEST": {
      return { ...state, loading: true };
    }
    case "CREATE-SUCCESS": {
      return { ...state, loading: false };
    }
    case "CREATE-FAIL": {
      return { ...state, loading: false };
    }
    default: {
      return state;
    }
  }
};

function PlaceOrderScreen() {
  const navigate = useNavigate();
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod, cartItems },
    userInfo,
  } = state;
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const shippingPrice = totalPrice > 100 ? 0 : 5;
  const calculateTax = totalPrice * 0.15;
  const totalOrder = totalPrice + shippingPrice + calculateTax;
  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE-REQUEST" });
      const { data } = await axios.post(
        "/api/orders",
        {
          cartItems,
          shippingAddress,
          paymentMethod,
          totalPrice,
          shippingPrice,
          calculateTax,
          totalOrder,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: "CART-CLEAR" });
      dispatch({ type: "CREATE-SUCCESS" });
      localStorage.removeItem("cartItems");
      navigate(`/orders/${data.order._id}`);
    } catch (error) {
      dispatch({ type: "CREATE-FAIL" });
      toast.error(getError(error));
    }
  };
  useEffect(() => {
    if (!paymentMethod) {
      navigate("/payment-method");
    }
  }, [navigate, paymentMethod]);
  return (
    <>
      <CheckoutComponents step1 step2 step3 step4></CheckoutComponents>
      <ToastContainer position="top-center" />
      <Helmet>
        <title>Place order</title>
      </Helmet>

      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Title style={{ margin: "10px" }}>Shipping</Card.Title>
            <Card.Body>
              <Card.Text>
                <strong>Full Name :</strong>
                <span style={{ marginLeft: "5px" }}>
                  {shippingAddress.name}
                </span>
              </Card.Text>
              <Card.Text>
                {" "}
                <strong>Address :</strong>
                <span style={{ marginLeft: "5px" }}>
                  {shippingAddress.address}, {shippingAddress.city}
                </span>
                <br />
                {shippingAddress.codePostal}, {shippingAddress.country}
              </Card.Text>
              <hr />
              <Link to="/shipping">Modify</Link>
            </Card.Body>
          </Card>
          <br />
          <Card>
            <Card.Title style={{ margin: "10px" }}>Payment method</Card.Title>
            <Card.Body>
              <Card.Text>
                <strong>Payment Method :</strong>
                <span style={{ marginLeft: "5px" }}>{paymentMethod}</span>
              </Card.Text>
              <hr />
              <Link to="/payment-method">Modify</Link>
            </Card.Body>
          </Card>
          <br />
          <Card>
            <Card.Title style={{ margin: "10px" }}>List of items</Card.Title>
            <Card.Body>
              <ListGroup variant="flush">
                {cartItems.map((el) => (
                  <ListGroup.Item key={el._id}>
                    <Row className="align-items-center">
                      <Col md={4}>
                        <img
                          src={el.image}
                          alt={el.name}
                          className="img-fluid rounded img-thumbnail"
                        />{" "}
                        <strong>{el.name}</strong>
                      </Col>
                      <Col md={3}></Col>
                      <Col md={2}>
                        <strong>{el.quantity}</strong>
                      </Col>
                      <Col md={3}>
                        <strong>{el.price}???</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <hr />
              <Link to="/cart">Modify</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Title style={{ margin: "10px" }}>Summary order</Card.Title>
            <Card.Body>
              <Row>
                <Col>
                  <strong>Items :</strong>
                </Col>
                <Col>{totalPrice.toFixed(2)} ???</Col>
              </Row>
              <Row>
                <Col>
                  <strong>Shipping :</strong>
                </Col>
                <Col>{shippingPrice.toFixed(2)} ???</Col>
              </Row>
              <Row>
                <Col>
                  <strong>Tax :</strong>
                </Col>
                <Col>{calculateTax.toFixed(2)} ???</Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <strong>Total Order :</strong>
                </Col>
                <Col>{totalOrder.toFixed(2)} ???</Col>
              </Row>
              <br />
              <div className="d-grid">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </div>
              {loading && <LoadingBox></LoadingBox>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default PlaceOrderScreen;
