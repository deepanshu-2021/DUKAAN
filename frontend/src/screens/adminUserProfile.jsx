// components/AdminUserProfileScreen.js
import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useGetUserByIdQuery } from "../slices/userSlices";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/meta";

const AdminUserProfileScreen = () => {
  const { id } = useParams();
  const { data: user, error, isLoading } = useGetUserByIdQuery(id);

  return (
    <Container className="mt-5">
      <Meta title="user profile" />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <Card>
          <Card.Header>User Profile</Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Card.Title>Name</Card.Title>
                <Card.Text>{user.name}</Card.Text>
              </Col>
              <Col md={6}>
                <Card.Title>Email</Card.Title>
                <Card.Text>{user.email}</Card.Text>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <Card.Title>Role</Card.Title>
                <Card.Text>{user.isAdmin ? "Admin" : "User"}</Card.Text>
              </Col>
              <Col md={6}>
                <Card.Title>Admin Status</Card.Title>
                <Card.Text>{user.isAdmin ? "Yes" : "No"}</Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default AdminUserProfileScreen;
