import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../style/index.css";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      className="bg-black fs-6"
      style={{ marginTop: "80px", padding: "auto" }}
    >
      <Container>
        <Row>
          <Col className="text-center fs-5 text-light m-auto ">{`DUKAAN@${currentYear}`}</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
