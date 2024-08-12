import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Toast } from "react-bootstrap";
import { useLoginMutation } from "../slices/userSlices";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/Loader";
import Meta from "../components/meta";
const LoginScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [redirect, navigate, userInfo]);
  const [login, { isLoading }] = useLoginMutation();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length == 0 || email.length == 0) {
      toast.error("Enter all the details!!");
      return;
    }
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <Container className="mt-5">
      <Meta title="login" />
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Sign In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="dark"
              type="submit"
              className="mt-3"
              disabled={isLoading}
            >
              Sign In
            </Button>
            <Row>
              <Col>
                New Customer?
                <Link to={`/register?redirect=${redirect}`}>Register</Link>
              </Col>
            </Row>
            <ToastContainer />
            {isLoading && <Loader />}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
