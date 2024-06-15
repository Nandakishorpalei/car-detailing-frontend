import { emptyApi } from "./emptyApi";
import qs from "qs";
import { User } from "../model/User";

const extendedApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    sendOtpToMail: build.mutation<any, { email: string }>({
      query: ({ email }) => {
        return {
          url: `/sendotptomail`,
          method: "post",
          body: {
            email,
          },
        };
      },
    }),
    verifyEmail: build.mutation<
      { success: boolean; message: string; data: User },
      { email: string; otp: string }
    >({
      query: ({ otp, email }) => {
        return {
          url: `/verifyemail`,
          method: "post",
          body: {
            email,
            otp,
          },
        };
      },
    }),
  }),
});

export const { useSendOtpToMailMutation, useVerifyEmailMutation } = extendedApi;
