import { emptyApi } from "./emptyApi";
import qs from "qs";
import { User } from "../model/User";
import { File } from "../model/File";

export const extendedApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    uploadFile: build.mutation<File, { payload: any }>({
      query: ({ payload }) => {
        return {
          url: `/upload`,
          method: "post",
          body: payload,
        };
      },
      invalidatesTags: ["Files"],
    }),
    getFiles: build.query<{ data: File[] }, void>({
      query: () => `/files`,
      providesTags: ["Files"],
    }),
    deleteFile: build.mutation<File, { fileId: string }>({
      query: ({ fileId }) => {
        return {
          url: `/files/${fileId}`,
          method: "delete",
        };
      },
      invalidatesTags: ["Files"],
    }),
  }),
});

export const {
  useUploadFileMutation,
  useGetFilesQuery,
  useDeleteFileMutation,
} = extendedApi;
