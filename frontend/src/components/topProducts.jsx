import React from "react";
import { useGetTopProductsQuery } from "../slices/productSlice";
import Loader from "./Loader";
import Message from "./Message";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const TopProducts = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  if (isLoading) return <Loader />;
  if (error)
    return <Message variant="danger" children={error.message}></Message>;
  return (
    <Carousel pause={"hover"} className="bg-secondary mt-3 p-2 mb-4">
      {products &&
        products.map((product) => (
          <Carousel.Item key={product._id} className="carousel-item-custom">
            <div className="image-container">
              <img
                className="d-block h-50 w-50"
                src={product.image}
                alt={product.name}
              />
            </div>
            <Carousel.Caption className="top_caption">
              <h3>
                <Link to={`/product/${product._id}`}>{product.name}</Link>
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default TopProducts;
