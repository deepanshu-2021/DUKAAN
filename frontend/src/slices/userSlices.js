import { apiSlice } from "./apislices";
import { USERS_URL } from "../constant";

const userSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "post",
        body: data,
      }),
    }),
    register: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "post",
        body: data,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "delete",
      }),
    }),
    getUserById: build.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
      }),
    }),
    getAllUsers: build.query({
      query: () => ({
        url: USERS_URL,
        method: "GET",
      }),
    }),
    changeToAdmin: build.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "PUT",
      }),
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useChangeToAdminMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
} = userSlice;
