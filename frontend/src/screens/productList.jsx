import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaEye } from "react-icons/fa";
import Loader from "../components/Loader";
import Paginate from "../components/pagination";
import Message from "../components/Message";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../slices/productSlice";
import { useParams } from "react-router-dom";
import Meta from "../components/meta";
const AdminProductListScreen = () => {
  const { pageNumber } = useParams() || 1;
  const { data, refetch, isLoading, error } = useGetProductsQuery({
    pageNumber,
  });
  const [deleteProduct] = useDeleteProductMutation();
  const [createProduct] = useCreateProductMutation();
  const deleteHandler = async (id) => {
    try {
      await deleteProduct(id);
      toast.success("Product is succesfully deleted!");
      refetch();
    } catch (err) {
      toast.error("unable to delete product!!");
    }
  };
  const createHandler = async (id) => {
    try {
      await createProduct();
      toast.success("Product is succesfully created!");
      refetch();
    } catch (err) {
      toast.error("unable to create product!!");
    }
  };
  useEffect(() => {}, [data]);
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" children={error?.data || error?.message} />
  ) : (
    <Container className="mt-5">
      <Meta title="productlist" />
      <Container className="d-flex justify-content-between mb-3">
        <h2>Products</h2>
        <Button
          variant="dark"
          onClick={() => {
            createHandler();
          }}
        >
          create product
        </Button>
      </Container>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {data.products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <LinkContainer to={`/product/${product._id}`}>
                  <Button variant="info" className="btn-sm mx-1">
                    <FaEye />
                  </Button>
                </LinkContainer>
                <LinkContainer to={`/admin/edit/${product._id}`}>
                  <Button variant="light" className="btn-sm mx-1">
                    <FaEdit />
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm mx-1"
                  onClick={() => deleteHandler(product._id)}
                >
                  <MdDelete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
      {data !== undefined && (
        <Paginate page={data.page} pages={data.pages} isAdmin={true} />
      )}
    </Container>
  );
};

export default AdminProductListScreen;
