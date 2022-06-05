import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../../Store";
import { getError } from "../../utils";

function SignupScreen() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const signupHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password not confirmed");
      return;
    }
    await axios
      .post("/api/users/signup", { name, email, password })
      .then(({ data }) => {
        console.log(data);
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
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3 inputBox">Sign Up</h1>
      <Form onSubmit={signupHandler}>
        <Form.Group className="mb-3 inputBox" controlId="name">
          <Form.Control
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <span>Name</span>
        </Form.Group>
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
        <Form.Group className="mb-3 inputBox" controlId="confirmPassword">
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span>Confirm Password</span>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
        <div className="mb-3">
          You have an account ?{" "}
          <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
        </div>
      </Form>
    </Container>
  );
}

export default SignupScreen;
