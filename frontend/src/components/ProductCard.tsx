import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const ProductCard = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded-2 h-100">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Link to={`/product/${product._id}`}>
        <Card.Body className="text-dark text-center">
          <Card.Title as="div" className="fs-5 text-black text-link-underline-dark text-truncate">
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text as="div">
            <Rating value={product.rating} text={product.numReviews} />
          </Card.Text>
          <Card.Text as="h3" className="text-secondary fs-4">
            {"₹" + product.price}
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ProductCard;
