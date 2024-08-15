import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useGetProductDeatilsQuery,
} from "../slices/productSlice";
import { toast, ToastContainer } from "react-toastify";
import Meta from "../components/meta";
import Loader from "../components/Loader";
import Message from "../components/Message";
const ProductEditScreen = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetProductDeatilsQuery(id);
  const navigate = useNavigate();
  const [updateProduct] = useUpdateProductMutation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const setData = () => {
    if (data) {
      setName(data.name || "");
      setDescription(data.description || "");
      setBrand(data.brand || "");
      setCountInStock(data.countInStock || 0);
      setPrice(data.price || 0);
      setCategory(data.category || "");
      setImage(null);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("countInStock", countInStock);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);

    try {
      await updateProduct(formData).unwrap();
      toast.success("Product edited successfully");
      setTimeout(() => {
        navigate("/admin/products");
      }, 2000);
    } catch (err) {
      toast.error("unable to update!!", err.message);
    }
  };
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message varient="danger" children={error.message} />
  ) : (
    <Container className="mt-5">
      {setData()}
      <Meta title="productedit" />
      <h2>Edit Product</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="description" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="brand" className="mt-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="countInStock" className="mt-3">
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter count in stock"
            value={countInStock}
            onChange={(e) => setCountInStock(Number(e.target.value))}
          />
        </Form.Group>

        <Form.Group controlId="price" className="mt-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </Form.Group>

        <Form.Group controlId="category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="image" className="mt-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>

        <Button type="submit" variant="dark" className="mt-3">
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default ProductEditScreen;
