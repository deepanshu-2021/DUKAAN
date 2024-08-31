import React from "react";
import { Container, Col, Button, Table, Row } from "react-bootstrap";
import Loader from "../components/Loader";
import { SiTicktick } from "react-icons/si";
import Message from "../components/Message";
import { MdDelete } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import {
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
} from "../slices/orderSlice";
import Meta from "../components/meta";
import { toast, ToastContainer } from "react-toastify";

const OrdersScreen = () => {
  const navigate = useNavigate();
  const {
    data: orders,
    isLoading,
    refetch,
    isError,
    error,
  } = useGetAllOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const deleteHandler = async (id) => {
    try {
      await deleteOrder(id);
      toast.success("deleted successfully!");
      refetch();
    } catch (eror) {
      toast.error("unable to delete!!");
    }
  };
  return (
    <Container>
      <Meta title="orders" />
      <Row className="justify-content-md-center">
        <Col xs={12}>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <Message variant="danger">{error.message}</Message>
          ) : (
            <div>
              <h2 className="text-center">Order History</h2>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Method</th>
                    <th>Total</th>
                    <th>Delivered</th>
                    <th>Paid</th>
                    <th>Date</th>
                    <th>View</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.paymentMethod}</td>
                      <td>{order.totalPrice}</td>
                      <td className="text-center">
                        {order.isDelivered ? <SiTicktick /> : <ImCross />}
                      </td>
                      <td className="text-center">
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
                      <td>
                        <Button
                          variant="danger"
                          className="btn-sm mx-1"
                          onClick={() => deleteHandler(order._id)}
                        >
                          <MdDelete />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default OrdersScreen;
