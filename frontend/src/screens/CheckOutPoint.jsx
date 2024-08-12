import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import Meta from "../components/meta";
const CheckOutPoint = ({ state1, state2, state3, state4 }) => {
  return (
    <Nav className="justify-content-center mb-4 fs-4">
      <Meta title="checkout" />
      <Nav.Item>
        {state1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {state2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {state3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {state4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckOutPoint;
