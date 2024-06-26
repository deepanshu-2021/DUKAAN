import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
    const currentYear:Number=new Date().getFullYear();
  return (
    <footer className='bg-black mt-5'>
        <Container >
            <Row>
                <Col className='text-center fs-1 text-light   py-5'>{`DUKAAN@${currentYear}`}</Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer