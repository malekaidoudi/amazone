import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import CheckoutComponents from "../components/checkoutComponents";
import { Store } from "../Store";
function PayMethScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const navigate = useNavigate();
  const [method, setMethod] = useState(paymentMethod || "PayPal");
  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SET-PAYMENT-METHOD", payload: method });
    navigate("/placeorder");
  };
  return (
    <>
      <CheckoutComponents step1 step2 step3></CheckoutComponents>
      <Container className="small-container">
        <Helmet>
          <title>Payment method</title>
        </Helmet>
        <h2>Choice your payment method ?</h2>

        <Form className="mb-3">
          <Form.Check
            type="radio"
            id="PayPal"
            label="PayPal"
            value="PayPal"
            checked={method === "PayPal"}
            onChange={(e) => setMethod(e.target.value)}
          />
          <br />
          <Form.Check
            type="radio"
            id="Streep"
            label="Streep"
            value="Streep"
            checked={method === "Streep"}
            onChange={(e) => setMethod(e.target.value)}
          />
        </Form>
        <Button onClick={submitHandler} type="submit">
          Continue
        </Button>
      </Container>
    </>
  );
}

export default PayMethScreen;
