import { apiSlice } from "./apislices";
import { ORDERS_URL } from "../constant";
const orderSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}/mine`,
        method: "POST",
        body: order,
      }),
    }),
    getOrderById: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "GET",
      }),
    }),
    getOrdersUser: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
        method: "GET",
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/`,
        method: "GET",
      }),
    }),
    updatePaid: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/${data.id}/paid`,
        method: "PUT",
        body: data.image,
      }),
    }),
    updateVerify: builder.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}/verify`,
        method: "PUT",
      }),
    }),
    updateDelivered: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/delivered`,
        method: "PUT",
      }),
    }),
  }),
});
export const {
  useCreateOrderMutation,
  useUpdatePaidMutation,
  useGetOrderByIdQuery,
  useGetOrdersUserQuery,
  useGetAllOrdersQuery,
  useUpdateDeliveredMutation,
  useUpdateVerifyMutation,
} = orderSlice;
