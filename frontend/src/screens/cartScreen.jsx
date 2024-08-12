import React from "react";
import {
  Col,
  Form,
  Container,
  Image,
  ListGroup,
  Row,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, deleteFromCart } from "../slices/cartSlice";
import { MdDelete } from "react-icons/md";
import Meta from "../components/meta";

const CartScreen = () => {
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const addtocart = (item, qty) => {
    let updateItem = { ...item };
    updateItem.qty = qty;
    dispatch(addToCart(updateItem));
  };
  const deleteformcart = (item) => {
    dispatch(deleteFromCart(item));
  };
  const checkOut = () => {
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/login?redirect=/shipping");
    }
  };
  return (
    <Container fluid>
      <Meta title="cart" />
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <Message>
          Cart is empty <Link to="/">Go back</Link>
        </Message>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <h2 className="m-auto">{item.name}</h2>
                    </Col>
                    <Col md={2}>
                      <h3 className="m-auto">{`₹${item.price}`}</h3>
                    </Col>
                    <Col md={2}>
                      <Form.Select
                        value={item.qty}
                        onChange={(e) => {
                          addtocart(item, Number(e.target.value));
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col>
                      <Button
                        variant="light"
                        onClick={() => {
                          deleteformcart(item);
                        }}
                      >
                        <MdDelete />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Header>
                <h1>{`Subtotal (${cartItems.length} items)`}</h1>
                <h4>{`₹${totalPrice}`}</h4>
              </Card.Header>
              <Card.Footer>
                <Button
                  variant="dark"
                  onClick={() => {
                    checkOut();
                  }}
                  style={{ margin: "10px" }}
                >
                  Proceed To Pay
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CartScreen;
