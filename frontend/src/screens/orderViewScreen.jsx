import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  useGetOrderByIdQuery,
  useUpdateDeliveredMutation,
  useUpdatePaidMutation,
  useUpdateVerifyMutation,
} from "../slices/orderSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Meta from "../components/meta";
const OrderViewScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderByIdQuery(orderId);
  const [updateDelivered, { error: updateError }] =
    useUpdateDeliveredMutation();
  const [updatePaid, { error: paidError }] = useUpdatePaidMutation();
  const [updateVerify, { isError }] = useUpdateVerifyMutation();
  const updatetoDelivered = async () => {
    if (updateError) {
      toast.error(error);
    } else {
      await updateDelivered(orderId).unwrap();
      refetch();
      toast.success("updated to delivered!!");
    }
  };
  const updatetoPaid = async () => {
    if (paidError) {
      toast.error(paidError);
    } else {
      await updatePaid({ id: orderId }).unwrap();
      refetch();
      toast.success("updated to paid!!");
    }
  };
  const updatetoVerifed = async () => {
    if (isError) {
      toast.error(isError);
    } else {
      await updateVerify(orderId).unwrap();
      refetch();
      toast.success("updated to verified!!");
    }
  };
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {}, [order]);
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message varient="danger" children={error.data.message} />
  ) : (
    <Container className="mt-5">
      <Meta title="order" />
      <h2>Order {order._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Shipping</h3>
              <p>
                <strong>Name: </strong> {order.user.name} <br />
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>{" "}
                <br />
                <strong>Address: </strong>
                {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.pinCode}`}
              </p>
              {order.isDelivered ? (
                <Message varient="success" children="Delivered" />
              ) : userInfo.isAdmin ? (
                <>
                  <Message varient="danger" children="Not Delivered" />
                  <Button
                    onClick={() => {
                      updatetoDelivered();
                    }}
                  >
                    change to delivered
                  </Button>
                </>
              ) : (
                <Message varient="danger" children="Not Delivered" />
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              {order.isVerified ? (
                <Message varient="success" children="Verified" />
              ) : (
                order.paymentMethod === "QRCode" &&
                userInfo.isAdmin && (
                  <>
                    <Message varient="danger" children="Not Verifed" />
                    <Button
                      onClick={() => {
                        updatetoVerifed();
                      }}
                    >
                      change to verify
                    </Button>
                  </>
                )
              )}
              {order.paymentMethod === "QRCode" && (
                <ListGroup.Item>
                  <a href={order.paymentImage} target="_blank">
                    <Button>view payment receipt</Button>
                  </a>
                </ListGroup.Item>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Payment Method</h3>
              <p>
                <strong>Method: </strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message varient="success" children="Paid" />
              ) : (
                <>
                  <Message varient="danger" children="Not Paid" />
                  {userInfo.isAdmin && (
                    <Button
                      onClick={() => {
                        updatetoPaid();
                      }}
                    >
                      change to paid
                    </Button>
                  )}
                </>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Order Items</h3>
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
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
                    {order.orderItems.reduce(
                      (acc, item) => acc + item.qty * item.price,
                      0
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default OrderViewScreen;
