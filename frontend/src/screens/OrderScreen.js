import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH-REQUEST": {
      return { ...state, loading: true };
    }
    case "FETCH-SUCCESS": {
      return { ...state, loading: false, order: action.payload };
    }
    case "FETCH-FAIL": {
      return { ...state, loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

function OrderScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { id: orderId } = params;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, order, error }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH-REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        dispatch({ type: "FETCH-SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH-FAIL", payload: getError(error) });
      }
    };
    if (!userInfo) {
      navigate("/login");
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [userInfo, navigate, orderId, order]);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        getError(error)
      ) : (
        <>
          <ToastContainer position="top-center" />
          <Helmet>
            <title>Place order</title>
          </Helmet>
          <h1 className="my-3">Order {orderId}</h1>
          <Row>
            <Col md={8}>
              <Card>
                <Card.Title style={{ margin: "10px" }}>Shipping</Card.Title>
                <Card.Body>
                  <Card.Text>
                    <strong>Full Name :</strong>
                    <span style={{ marginLeft: "5px" }}>
                      {order.shippingAddress.name}
                    </span>
                  </Card.Text>
                  <Card.Text>
                    {" "}
                    <strong>Address :</strong>
                    <span style={{ marginLeft: "5px" }}>
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city}
                    </span>
                    <br />
                    {order.shippingAddress.codePostal},{" "}
                    {order.shippingAddress.country}
                  </Card.Text>
                  {order.isDelivered ? (
                    <MessageBox>
                      Order is Delivered at {order.paidAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">
                      Order Not Delivered
                    </MessageBox>
                  )}
                </Card.Body>
              </Card>
              <br />
              <Card>
                <Card.Title style={{ margin: "10px" }}>
                  Payment method
                </Card.Title>
                <Card.Body>
                  <Card.Text>
                    <strong>Payment Method :</strong>
                    <span style={{ marginLeft: "5px" }}>
                      {order.paymentMethod}
                    </span>
                  </Card.Text>
                  {order.isPaid ? (
                    <MessageBox>Order is Paid at {order.paidAt}</MessageBox>
                  ) : (
                    <MessageBox variant="danger">Order Not Paid</MessageBox>
                  )}
                </Card.Body>
              </Card>
              <br />
              <Card>
                <Card.Title style={{ margin: "10px" }}>
                  List of items
                </Card.Title>
                <Card.Body>
                  <ListGroup variant="flush">
                    {order.orderItems.map((el) => (
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
                            <strong>{el.price}€</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Title style={{ margin: "10px" }}>
                  Summary order
                </Card.Title>
                <Card.Body>
                  <Row>
                    <Col>
                      <strong>Items :</strong>
                    </Col>
                    <Col>{order.totalPrice} €</Col>
                  </Row>
                  <Row>
                    <Col>
                      <strong>Shipping :</strong>
                    </Col>
                    <Col>{order.shippingPrice} €</Col>
                  </Row>
                  <Row>
                    <Col>
                      <strong>Tax :</strong>
                    </Col>
                    <Col>{order.calculateTax} €</Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col>
                      <strong>Total Order :</strong>
                    </Col>
                    <Col>{order.totalOrder} €</Col>
                  </Row>
                  {/* <br />
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
                  {loading && <LoadingBox></LoadingBox>} */}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default OrderScreen;
