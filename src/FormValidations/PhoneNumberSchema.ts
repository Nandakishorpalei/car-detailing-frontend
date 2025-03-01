import { ConfirmationResult } from "firebase/auth";
import { object, string } from "yup";

export const phoneNumberSchema = (user: ConfirmationResult | null) =>
  object({
    name: string().min(1).required("Name is required"),
    phone: string()
      .min(1)
      .required("Phone number is required")
      .test("phone", "Invalid phone number", (value) => value?.length === 12),
    otp: string().when("$user", {
      is: (user: any) => !!user, // Checks if `user` exists
      then: (schema) =>
        schema.required("OTP is required").length(6, "OTP must be 6 digits"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
