import { emptyApi } from "./emptyApi";
import { ProductPayload, ProductResponse } from "../model/Product";

export const extendedApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    addProduct: build.mutation<
      { product: ProductResponse },
      { payload: ProductPayload }
    >({
      query: ({ payload }) => {
        const formData = new FormData();
        for (const key in payload) {
          if (payload.hasOwnProperty(key)) {
            //@ts-ignore
            const value = payload[key];
            const formKey = key;
            formData.append(formKey, value);
          }
        }
        return {
          url: `/product/upload`,
          method: "post",
          body: payload,
        };
      },
      invalidatesTags: ["Product"],
    }),
    getProducts: build.query<{ products: ProductResponse[] }, void>({
      query: () => `/product`,
      providesTags: ["Product"],
    }),
    getMyProducts: build.query<{ products: ProductResponse[] }, void>({
      query: () => `/product/myproducts`,
      providesTags: ["Product"],
    }),
    deleteProduct: build.mutation<
      { product: ProductResponse },
      { productId: string }
    >({
      query: ({ productId }) => {
        return {
          url: `/product/${productId}`,
          method: "delete",
        };
      },
      invalidatesTags: ["Product"],
    }),
    getProductById: build.query<
      { products: ProductResponse },
      { productId: string }
    >({
      query: ({ productId }) => `/product/${productId}`,
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
  useGetMyProductsQuery,
  useGetProductByIdQuery,
} = extendedApi;
