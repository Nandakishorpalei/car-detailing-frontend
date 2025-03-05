import { emptyApi } from "./emptyApi";
import {
  ServiceDetailsPayload,
  ServiceDetailsResponse,
} from "../model/ServiceDetails";
import { File } from "../model/File";
import qs from "qs";

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
        username: string | null;
        model: string | null;
        color: string | null;
        search: string | null;
        year: string | null;
        work_status: string | null;
        registration_number: string | null;
      }
    >({
      query: ({
        username,
        model,
        color,
        search,
        work_status,
        year,
        registration_number,
      }) => {
        let queryUrl = qs.stringify(
          {
            username,
            model,
            color,
            search,
            work_status,
            year,
            registration_number,
          },
          { skipNulls: true, addQueryPrefix: true }
        );
        return {
          url: `/services/${queryUrl}`,
          method: "GET",
        };
      },
      providesTags: ["Services"],
    }),

    getMyServices: build.query<
      { serviceDetails: ServiceDetailsResponse[] },
      {
        model: string | null;
        color: string | null;
        search: string | null;
        year: string | null;
        work_status: string | null;
        registration_number: string | null;
      }
    >({
      query: ({
        model,
        color,
        search,
        work_status,
        year,
        registration_number,
      }) => {
        let queryUrl = qs.stringify(
          {
            model,
            color,
            search,
            work_status,
            year,
            registration_number,
          },
          { skipNulls: true, addQueryPrefix: true }
        );
        return {
          url: `/services/myservices/${queryUrl}`,
          method: "GET",
        };
      },
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
          years: string[];
          usernames: string[];
          models: string[];
          registration_numbers: string[];
          colors: string[];
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
