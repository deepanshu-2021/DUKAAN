import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaEye } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { ImCross } from "react-icons/im";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useChangeToAdminMutation,
} from "../slices/userSlices";
import { useSelector } from "react-redux";
import Meta from "../components/meta";

const AdminUserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetAllUsersQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const [changeToAdmin] = useChangeToAdminMutation();
  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    try {
      await deleteUser(id);
      toast.success("User successfully deleted!");
      refetch();
    } catch (err) {
      toast.error("Unable to delete user!");
    }
  };

  const changeToAdminHandler = async (id) => {
    try {
      await changeToAdmin(id).unwrap();
      toast.success("User successfully updated to Admin!");
      refetch();
    } catch (err) {
      toast.error("Unable to update user to Admin!");
    }
  };

  useEffect(() => {}, [users]);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" children={error?.data || error?.message} />
  ) : (
    <Container className="mt-5">
      <Meta title="userlist" />
      <Container className="d-flex justify-content-between mb-3">
        <h2>Users</h2>
        {/* <Button variant="dark">Create User</Button> */}
      </Container>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? <SiTicktick /> : <ImCross />}</td>
              <td>
                <LinkContainer to={`/admin/user/${user._id}`}>
                  <Button variant="info" className="btn-sm mx-1">
                    <FaEye />
                  </Button>
                </LinkContainer>
                <Button
                  variant="dark"
                  className="btn-sm mx-1"
                  onClick={() => changeToAdminHandler(user._id)}
                >
                  to admin
                </Button>
                <Button
                  variant="danger"
                  className="btn-sm mx-1"
                  disabled={userInfo.id === user._id}
                  onClick={() => deleteHandler(user._id)}
                >
                  <MdDelete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
    </Container>
  );
};

export default AdminUserListScreen;
