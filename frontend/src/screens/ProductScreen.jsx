import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Col,
  Form,
  Row,
  Image,
  ListGroup,
  Button,
  Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  useGetProductDeatilsQuery,
  useAddProductReviewMutation,
} from "../slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import Meta from "../components/meta";
const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDeatilsQuery(id);
  const [addProductReview, { isLoading: reviewLoading }] =
    useAddProductReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {}, [product]);
  const addtocart = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await addProductReview({ id, rating, comment }).unwrap();
      refetch();
      toast.success("Review submitted successfully");
    } catch (err) {
      toast.error(err.data.message);
    }
  };
  return (
    <>
      <Container>
        {product && <Meta title={product.name} />}
        <Link to="/" className="btn btn-light m-3 py-3 fs-5">
          Go Back
        </Link>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message
            variant="danger"
            children={error?.data?.message || error.error}
          />
        ) : (
          <>
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
                  {product.countInStock > 0 && (
                    <>
                      <ListGroup.Item>
                        <Row>
                          <Col>QTY:</Col>
                          <Col>
                            <Form.Select
                              value={qty}
                              onChange={(e) => {
                                setQty(Number(e.target.value));
                              }}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Select>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button
                          onClick={() => {
                            addtocart();
                          }}
                          className=" text-light rounded-1  bg-black px-2 py-3"
                        >
                          ADD TO CART
                        </Button>
                      </ListGroup.Item>
                    </>
                  )}
                </ListGroup>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Write a Customer Review</h2>
                    {reviewLoading && <Loader />}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment" className="mt-3">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="dark" className="mt-3">
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to="/login">sign in</Link> to write a
                        review
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
        <ToastContainer />
      </Container>
    </>
  );
};

export default ProductScreen;
