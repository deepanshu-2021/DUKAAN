import React from "react";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/userSlices";
import { unSetCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import Searchbar from "../components/searchbar";
const Header = () => {
  let [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logout();
    dispatch(unSetCredentials());
    navigate("/login");
  };
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="fs-4">DUKAAN</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Searchbar />
            <LinkContainer to="/cart">
              <Nav.Link href="/cart" className="fs-4">
                <FaShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                    {cartItems.length}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown
                className="fs-4"
                title={userInfo.name}
                id="nav-dropdown"
              >
                <NavDropdown.Item className="fs-4" onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
                <LinkContainer className="fs-4" to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link href="/login" className="fs-4">
                  <FaUser /> Sign-In
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown className="fs-4" title="Admin" id="nav-dropdown">
                <LinkContainer className="fs-4" to="/admin/orders">
                  <NavDropdown.Item className="fs-4">orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer className="fs-4" to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer className="fs-4" to="/admin/products/1">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer className="fs-4" to="/admin/users/">
                  <NavDropdown.Item>users</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
