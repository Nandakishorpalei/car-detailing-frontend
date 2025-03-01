import { emptyApi } from "./emptyApi";
import {
  ServiceDetailsPayload,
  ServiceDetailsResponse,
} from "../model/ServiceDetails";

export const extendedApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    addService: build.mutation<
      { serviceDetails: ServiceDetailsResponse },
      ServiceDetailsPayload
    >({
      query: (payload) => {
        return {
          url: `/services/add`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Services"],
    }),

    getServices: build.query<
      { serviceDetails: ServiceDetailsResponse[] },
      {
        username?: string;
        model?: string;
        color?: string;
        search?: string;
        approval_status?: "created" | "approved" | "rejected";
      }
    >({
      query: ({ username, model, color, search, approval_status } = {}) => ({
        url: `/services`,
        method: "GET",
        params: { username, model, color }, // Pass filters as query params
      }),
      providesTags: ["Services"],
    }),

    getMyServices: build.query<
      { serviceDetails: ServiceDetailsResponse[] },
      { model?: string; color?: string; year?: number; search?: string }
    >({
      query: ({ model, color, year, search } = {}) => ({
        url: `/services/myservices`,
        method: "GET",
        params: { model, color, year, search }, // Pass filters as query params
      }),
      providesTags: ["Services"],
    }),

    deleteService: build.mutation<
      { serviceDetails: ServiceDetailsResponse },
      { serviceId: string }
    >({
      query: ({ serviceId }) => ({
        url: `/services/${serviceId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Services"],
    }),

    getServiceById: build.query<
      { serviceDetails: ServiceDetailsResponse },
      { serviceId: string }
    >({
      query: ({ serviceId }) => ({
        url: `/services/${serviceId}`,
        method: "GET",
      }),
      providesTags: ["Services"],
    }),

    getFilterOptions: build.query<
      {
        filterOptions: {
          years: number[];
          usernames: string[];
          models: string[];
        };
      },
      void
    >({
      query: () => ({
        url: `/services/filter-options`,
        method: "GET",
      }),
      providesTags: ["FilterOptions"],
    }),

    approveService: build.mutation<
      {
        success: boolean;
        message: string;
        serviceDetails: ServiceDetailsResponse;
      },
      { serviceId: string; action: "approve" | "reject" }
    >({
      query: ({ serviceId, action }) => ({
        url: `/services/${serviceId}/approve`,
        method: "PUT",
        body: { action }, // Pass the action (approve/reject)
      }),
      invalidatesTags: ["Services"],
    }),
  }),
});

export const {
  useAddServiceMutation,
  useGetServicesQuery,
  useGetMyServicesQuery,
  useDeleteServiceMutation,
  useGetServiceByIdQuery,
  useGetFilterOptionsQuery,
  useApproveServiceMutation, // New hook for the approve/reject API
} = extendedApi;
