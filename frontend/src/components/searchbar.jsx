import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Searchbar = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        placeholder="Search products..."
        className="mr-sm-2 ml-sm-5 my-2"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        value={keyword}
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2 mx-2 my-2">
        search
      </Button>
    </Form>
  );
};

export default Searchbar;
