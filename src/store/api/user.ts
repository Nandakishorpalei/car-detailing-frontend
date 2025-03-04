import { emptyApi } from "./emptyApi";
import { User } from "../model/User";

export const usersApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<{ users: User[] }, void>({
      query: () => {
        return {
          url: `/users`,
        };
      },
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetAllUsersQuery } = usersApi;
