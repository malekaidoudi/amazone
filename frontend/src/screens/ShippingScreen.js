import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
// import "./formShipping-style.css";
import CheckoutComponents from "../components/checkoutComponents";

function ShippingScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
    userInfo,
  } = state;
  const navigate = useNavigate();
  const [name, setName] = useState(shippingAddress.name || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [codePostal, setCodePostal] = useState(
    shippingAddress.codePostal || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shopping");
    }
  }, [navigate, userInfo]);
  const submitHandler = (e) => {
    ctxDispatch({
      type: "ADD_SHIPPING_ADDRESS",
      payload: {
        name,
        address,
        city,
        codePostal,
        country,
      },
    });
    navigate("/payment-method");
  };
  return (
    <>
      <CheckoutComponents step1 step2></CheckoutComponents>
      <div className="small-container">
        <Helmet>
          <title>Shipping Address</title>
        </Helmet>

        <h2>Shipping Address</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="inputBox mb-3" controlId="name">
            <Form.Control
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <span>Full Name</span>
          </Form.Group>
          <Form.Group className="inputBox mb-3" controlId="address">
            <Form.Control
              type="text"
              required
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
            <span>Address</span>
          </Form.Group>
          <Form.Group className="inputBox mb-3" controlId="city">
            <Form.Control
              type="text"
              required
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
            <span>City</span>
          </Form.Group>
          <Form.Group className="inputBox mb-3" controlId="codePostal">
            <Form.Control
              type="text"
              required
              onChange={(e) => setCodePostal(e.target.value)}
              value={codePostal}
            />
            <span>Postal Code</span>
          </Form.Group>
          <Form.Group className="inputBox mb-3" controlId="country">
            <Form.Control
              type="text"
              required
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
            <span>Country</span>
          </Form.Group>
          <div className="inputBox ">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default ShippingScreen;
