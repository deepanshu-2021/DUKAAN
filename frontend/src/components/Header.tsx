import React from 'react'
import { Navbar,Nav,Container } from 'react-bootstrap'
import { FaShoppingCart,FaUser } from "react-icons/fa";
import { LinkContainer } from 'react-router-bootstrap'
const Header = () => {
  return (
    <Navbar bg='dark' variant='dark' expand="md" collapseOnSelect>
      <Container>
      <LinkContainer to='/'>
      <Navbar.Brand  className='fs-1'>DUKAAN</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='basic-navbar-nav'/>
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ms-auto'>
          <LinkContainer to='/cart'><Nav.Link href='/cart' className='fs-3'><FaShoppingCart/> Cart</Nav.Link></LinkContainer>
          <LinkContainer to='/user'><Nav.Link href='/user' className='fs-3'><FaUser/> SignIn</Nav.Link></LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Container>
    </Navbar>
  )
}

export default Header