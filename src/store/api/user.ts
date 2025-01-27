import { emptyApi } from "./emptyApi";
import { User } from "../model/User";

const extendedApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<{ user: User[] }, void>({
      query: () => {
        return {
          url: `/users`,
        };
      },
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetAllUsersQuery } = extendedApi;
