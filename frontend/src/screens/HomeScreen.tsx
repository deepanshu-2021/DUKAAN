import React from "react";
import  products from '../products'
import { Row,Col, Container } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
const HomeScreen = () => {
  return (
    <>
    <Container className="container-fluid">
      <h1 className="text-center p-2">Latest Prdouct</h1>
      <Row className="gx-5 gy-5">
        {products.map((Prdouct):any => (
          <Col  sm={12} md={6} lg={4} xl={3}>
            <ProductCard product={Prdouct}/>
          </Col>
        ))}
      </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
