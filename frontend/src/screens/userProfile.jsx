import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useUpdateProfileMutation } from "../slices/userSlices";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";
import { SiTicktick } from "react-icons/si";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { useGetOrdersUserQuery } from "../slices/orderSlice";
import Meta from "../components/meta";

const UserProfile = () => {
  const {
    data: orders,
    isLoading: loadingOrders,
    isError: errorOrders,
    error: orderError,
  } = useGetOrdersUserQuery();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const [updateProfile, { isLoading, isError }] = useUpdateProfileMutation();

  const handleSubmit = async (e) => {
    const data = {};
    e.preventDefault();
    if (password.length !== 0 && confirmPassword.length !== 0) {
      if (password !== confirmPassword) {
        toast.error("Password and confirm password did not match!");
        return;
      }
      data.password = password;
    }
    data.name = name;
    data.email = email;
    try {
      const res = await updateProfile(data);
      dispatch(setCredentials(res.data));
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Meta title={name} />
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">User Profile</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword" className="mt-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            {isLoading ? (
              <Loader />
            ) : (
              <Button variant="dark" type="submit" className="mt-3">
                Update Profile
              </Button>
            )}
          </Form>
        </Col>
        <Col xs={12} md={6}>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{orderError.message}</Message>
          ) : (
            <div>
              <h2 className="text-center">Order History</h2>
              <div className="table-responsive">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Method</th>
                      <th>Total</th>
                      <th>Delivered</th>
                      <th>Paid</th>
                      <th>Date</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.paymentMethod}</td>
                        <td>{order.totalPrice}</td>
                        <td className="flex text-center">
                          {order.isDelivered ? <SiTicktick /> : <ImCross />}
                        </td>
                        <td className="flex text-center">
                          {order.isPaid ? <SiTicktick /> : <ImCross />}
                        </td>
                        <td>{order.createdAt.slice(0, 10)}</td>
                        <td>
                          <Button
                            variant="light"
                            onClick={() => {
                              navigate(`/order/${order._id}`);
                            }}
                          >
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          )}
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default UserProfile;
