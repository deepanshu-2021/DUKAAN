import { apiSlice } from "./apislices";
import { PRODUCTS_URL } from "../constant";
const productSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: (parameters) => ({
        url: PRODUCTS_URL,
        params: parameters,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    getTopProducts: build.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDeatils: build.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    createProduct: build.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
    }),
    addProductReview: build.mutation({
      query: (review) => ({
        url: `${PRODUCTS_URL}/review/${review.id}`,
        method: "PUT",
        body: review,
      }),
    }),
    updateProduct: build.mutation({
      query: (product) => ({
        url: `${PRODUCTS_URL}/${product.get("id")}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetTopProductsQuery,
  useGetProductDeatilsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useAddProductReviewMutation,
} = productSlice;
