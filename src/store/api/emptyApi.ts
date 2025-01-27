import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOutUser } from "../../utils/logOut";

const getAccessToken = async () => {
  let authInLocal;
  try {
    authInLocal = localStorage.getItem("authToken");
    if (!authInLocal) {
      // logOutUser();
    }
    return authInLocal;
  } catch (error) {
    logOutUser();
  }
};

const baseURL = process.env.NODE_APP_BASE_URL || "http://localhost:8000";

const query = fetchBaseQuery({
  baseUrl: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const accessToken = await getAccessToken();
  const headers: { Authorization?: string } = {};

  if (accessToken) {
    headers.Authorization = accessToken;
  }

  let queryParams: string | FetchArgs = { url: "" };

  if (typeof args === "object") {
    queryParams = { ...args, headers };
  } else {
    queryParams = { url: args, headers };
  }

  let result = await query(queryParams, api, extraOptions);

  if (result?.error) {
    return {
      error: result.error,
    };
  }

  // return result;
  return {
    ...result,
    data: result.data,
  } as QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>;
};

export const emptyApi = createApi({
  tagTypes: ["Users", "Files", "Product"],
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
