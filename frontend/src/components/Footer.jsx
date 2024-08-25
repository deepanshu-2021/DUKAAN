import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../style/index.css";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-black" style={{ paddingTop: "300px" }}>
      <Container>
        <Row>
          <Col className="text-center fs-4 text-light   py-5">{`DUKAAN@${currentYear}`}</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
