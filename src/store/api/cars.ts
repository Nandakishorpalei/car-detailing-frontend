import { emptyApi } from "./emptyApi";
import { Car } from "../model/Car";

const extendedApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCars: build.query<{ cars: Car[] }, void>({
      query: () => {
        return {
          url: `/cars`,
        };
      },
      providesTags: ["Cars"],
    }),
  }),
});

export const { useGetAllCarsQuery } = extendedApi;
