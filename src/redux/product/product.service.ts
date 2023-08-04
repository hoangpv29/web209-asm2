import { createApi } from "@reduxjs/toolkit/query/react";
import fetchBaseQueryConfig from "../../configs/request";
import { IProduct } from "../../interface/index";

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQueryConfig,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], { q?: string; categoryId?: number }>(
      {
        query: (params) => ({
          url: "/products",
          params,
        }),

        providesTags: (result, _error, arg) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: "Products" as const, id })),
                "Products",
              ]
            : ["Products"],
      }
    ),
    getProductByCategory: builder.query<IProduct, number>({
      query: (id) => `/categories/${id}/products`,
    }),
    getProductById: builder.query<IProduct, number>({
      query: (id) => "/products/" + id,
    }),
    newProduct: builder.mutation<IProduct, IProduct>({
      query: (data) => ({
        url: "/products/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "Products" }],
    }),
    updateProduct: builder.mutation<IProduct, IProduct>({
      query: (data) => ({
        url: "/products/" + data.id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Products", id: arg.id },
      ],
    }),
    deleteProductById: builder.mutation<IProduct, number>({
      query: (id) => ({
        url: "/products/" + id,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Products", id: arg },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductByIdMutation,
  useNewProductMutation,
  useUpdateProductMutation,
} = productApi;
export default productApi;
