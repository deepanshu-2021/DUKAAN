import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckOutPoint from "./CheckOutPoint";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPayment } from "../slices/cartSlice";
import Meta from "../components/meta";
import QRCode from "react-qr-code";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("");
  const { shippingAddress } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      toast.error("Please select a payment method");
    } else {
      dispatch(addPayment(paymentMethod));
      navigate("/order");
      toast.success(`Selected payment method: ${paymentMethod}`);
    }
  };

  const upiID = "deepanshubaluni07@okicici";
  const qrCodeValue = `upi://pay?pa=${upiID}&pn=deepanshubaluni&cu=INR&mode=02`;

  return (
    <Container className="mt-5 mb-4">
      <Meta title="Payment" />
      <CheckOutPoint state1={true} state2={true} state3={true} />
      <Row className="flex justify-content-center">
        <Col md={6}>
          <h2 className="text-center">Payment Options</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="paymentMethod ">
              <Form.Label>Select Payment Method</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="QR Code"
                  id="QRCode"
                  name="paymentMethod"
                  value="QRCode"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="Cash on Delivery"
                  id="CashOnDelivery"
                  name="paymentMethod"
                  value="CashOnDelivery"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>
            </Form.Group>

            {paymentMethod === "QRCode" && (
              <Form.Group controlId="qrCodeImage">
                <Form.Label>Scan the QR Code to Pay</Form.Label>
                <div>
                  <QRCode
                    size={200}
                    style={{
                      height: "auto",
                      maxWidth: "50%",
                      width: "50%",
                    }}
                    viewBox={`0 0 256 256`}
                    value={qrCodeValue}
                  />
                </div>
              </Form.Group>
            )}

            <Button variant="dark" type="submit" className="mt-3">
              Continue
            </Button>
            <ToastContainer />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentScreen;
