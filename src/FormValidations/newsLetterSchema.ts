import { object, string } from "yup";
import { isValidEmail } from "../utils/isValidEmail";

export const newsLetterSchema = () =>
  object({
    email: string()
      .min(1)
      .required("Email is required")
      .test("email", "Invalid email", (value) => isValidEmail(value)),
  });
