import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckOutPoint from "./CheckOutPoint";
import { useDispatch, useSelector } from "react-redux";
import { addShipingAddress } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import Meta from "../components/meta";
const ShippingScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPincode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (address.length && city.length && state.length && pinCode.length) {
      dispatch(addShipingAddress({ address, pinCode, city, state }));
      navigate("/payment");
    } else {
      toast.error("Fill all details!!");
    }
  };
  return (
    <Container className="mt-5">
      <Meta title="shopping" />
      <CheckOutPoint state1={true} state2={true} />
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Shipping Information</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPincode">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your pincode"
                value={pinCode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </Form.Group>
            <Button variant="dark" type="submit" className="mt-3">
              continue
            </Button>
            <ToastContainer />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingScreen;
