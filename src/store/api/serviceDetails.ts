import { emptyApi } from "./emptyApi";
import {
  ServiceDetailsPayload,
  ServiceDetailsResponse,
} from "../model/ServiceDetails";
import { File } from "../model/File";

export const extendedApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    addService: build.mutation<
      { serviceDetails: ServiceDetailsResponse },
      ServiceDetailsPayload
    >({
      query: (payload) => {
        return {
          url: `/services`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Services"],
    }),

    updateServiceDetails: build.mutation<
      { serviceDetails: ServiceDetailsResponse },
      ServiceDetailsPayload & { serviceId: string }
    >({
      query: (payload) => {
        return {
          url: `/services/${payload.serviceId}`,
          method: "PUT",
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
        approval_status?: "pending" | "in_progress" | "completed" | "rejected";
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

    updateService: build.mutation<
      {
        success: boolean;
        serviceDetails: ServiceDetailsResponse;
      },
      {
        serviceId: string;
        payload: {
          work_status?: "in_progress" | "completed" | "rejected";
          post_service_photos?: File[];
        };
      }
    >({
      query: ({ serviceId, payload }) => ({
        url: `/services/${serviceId}`,
        method: "PATCH",
        body: payload,
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
  useUpdateServiceMutation,
  useUpdateServiceDetailsMutation,
} = extendedApi;
