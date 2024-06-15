import { emptyApi } from "./emptyApi";
import qs from "qs";
import { User } from "../model/User";

const extendedApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    sendOtpToPhone: build.mutation<
      { success: boolean; message: string; data: User },
      { phone: string; email: string }
    >({
      query: ({ phone, email }) => {
        return {
          url: `/sendotptophone`,
          method: "post",
          body: {
            phone,
            email,
          },
        };
      },
    }),
    verifyPhone: build.mutation<
      { success: boolean; message: string; data: User },
      { phone: string; otp: string }
    >({
      query: ({ otp, phone }) => {
        return {
          url: `/verifyphone`,
          method: "post",
          body: {
            phone,
            otp,
          },
        };
      },
    }),
  }),
});

export const { useSendOtpToPhoneMutation, useVerifyPhoneMutation } =
  extendedApi;
