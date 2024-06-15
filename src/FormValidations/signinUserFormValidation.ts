import { object, string } from "yup";
import { isValidEmail } from "../utils/isValidEmail";

export const signinUserFormSchema = () =>
  object({
    email: string()
      .min(1)
      .required("Email is required")
      .test("email", "Invalid email", (value) => isValidEmail(value)),
    password: string()
      .min(8)
      .required("Password is required and must contain 8 characters."),
  });
