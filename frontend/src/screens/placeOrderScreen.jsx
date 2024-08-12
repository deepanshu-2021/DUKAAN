import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import CheckOutPoint from "./CheckOutPoint";
import {
  useCreateOrderMutation,
  useUpdatePaidMutation,
} from "../slices/orderSlice";
import { ToastContainer, toast } from "react-toastify";
import { addeOrder } from "../slices/cartSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/meta";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [updatePaid] = useUpdatePaidMutation();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    paymentMethod,
    shippingAddress,
    cartItems,
    deliveryPrice,
    totalTax,
    totalPrice,
    itemPrice,
  } = useSelector((state) => state.cart);

  const [uploadedImage, setUploadedImage] = useState(null);
  const [image, setImage] = useState(null);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const placeOrder = async () => {
    try {
      const order = {
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        shippingPrice: deliveryPrice,
        paymentMethod: paymentMethod,
        totalPrice: totalPrice,
        taxPrice: totalTax,
        itemsPrice: itemPrice,
        user: userInfo.id,
      };
      const res = await createOrder(order).unwrap();
      dispatch(addeOrder(res));
      if (paymentMethod === "QRCode" && image) {
        const formData = new FormData();
        formData.append("image", image);
        await updatePaid({ image: formData, id: res._id });
      }
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err.data);
    }
  };
  console.log(paymentMethod);
  useEffect(() => {
    if (!(paymentMethod && shippingAddress)) {
      navigate("/payment");
    }
  }, [shippingAddress, paymentMethod, navigate]);

  return (
    <Container className="mt-5">
      <Meta title="Place Order" />
      <CheckOutPoint state1={true} state2={true} state3={true} state4={true} />
      <h2>Order Summary</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Shipping</h3>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city},{" "}
                {shippingAddress.state}, {shippingAddress.pincode}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Payment Method</h3>
              <p>
                <strong>Method: </strong>
                //{paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Order Items</h3>
              <ListGroup variant="flush">
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <p>{item.name}</p>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>

            {paymentMethod === "QRCode" && (
              <ListGroup.Item>
                <h3>Upload Payment Confirmation</h3>
                <Form.Group controlId="paymentImage">
                  <Form.Control type="file" onChange={handleImageUpload} />
                </Form.Group>
                {uploadedImage && (
                  <div className="mt-3">
                    <Image
                      src={uploadedImage}
                      alt="Payment Confirmation"
                      fluid
                      rounded
                    />
                  </div>
                )}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Order Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>
                    $
                    {cartItems.reduce(
                      (acc, item) => acc + item.qty * item.price,
                      0
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${deliveryPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${totalTax}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {cartItems.length ? (
                  <Button
                    type="button"
                    className="btn btn-dark btn-block"
                    disabled={cartItems.length === 0}
                    onClick={placeOrder}
                  >
                    Place Order
                  </Button>
                ) : (
                  <Message variant="danger">No items in the cart</Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
      {isLoading && <Loader />}
    </Container>
  );
};

export default PlaceOrderScreen;
