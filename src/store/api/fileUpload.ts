import { emptyApi } from "./emptyApi";
import { User } from "../model/User";
import { File } from "../model/File";

export const extendedApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    uploadFiles: build.mutation<{ files: File[] }, { payload: any }>({
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
  useUploadFilesMutation,
  useGetFilesQuery,
  useDeleteFileMutation,
} = extendedApi;
