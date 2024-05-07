import React from "react";
import { Link, useParams } from "react-router-dom";
import products from "../products";
import { Col, Row, Image, ListGroup, Button, Container } from "react-bootstrap";
import Rating from "./Rating";

const ProductScreen = () => {
  const { id } = useParams();
  const product: any = products.find((element) => element._id == id);
  console.log(product);
  return (
    <>
      <Container>
        <Link to="/" className="btn btn-light m-3 py-3 fs-5">
          Go Back
        </Link>
        <Row>
          <Col md={5}>
            <Image
              className="fs-4"
              src={product.image}
              alt={product.name}
              fluid
            />
          </Col>
          <Col className="fs-4" md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>{product.name}</ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} Reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>PRICE:</Col>
                  <Col>{`$${product.price}`}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3} className="fs-4 ">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>STOCK:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>PRICE:</Col>
                  <Col>{`$${product.price}`}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className=" text-light rounded-1  bg-black px-2 py-3">
                  ADD TO CART
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductScreen;
