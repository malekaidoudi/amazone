import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";
import { getError } from "../utils";

function SigninScreen() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const signinHandler = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/users/signin", { email, password })
      .then(({ data }) => {
        ctxDispatch({ type: "SUCCESS_CONNECTED", payload: data });

        navigate(redirect || "/");
      })
      .catch((err) => {
        toast.error(getError(err));
      });
  };
  //si t'es deja connecté il affiche pas la page signin
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [redirect, navigate, userInfo]);
  return (
    <Container className="small-container">
      <ToastContainer position="top-center" />
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3 inputBox">Sign In</h1>
      <Form onSubmit={signinHandler}>
        <Form.Group className="mb-3 inputBox" controlId="email">
          <Form.Control
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span>Email</span>
        </Form.Group>
        <Form.Group className="mb-3 inputBox" controlId="password">
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span>Password</span>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
          New customer?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
}

export default SigninScreen;
