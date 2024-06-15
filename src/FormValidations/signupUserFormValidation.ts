import { object, string } from "yup";
import { isStrongPassword } from "../utils/isStrongPassword";
import { isValidEmail } from "../utils/isValidEmail";

export const signupUserFormSchema = () =>
  object({
    firstName: string().min(1).required("First name is required"),
    lastName: string().min(1).required("Last name is required"),
    email: string()
      .min(1)
      .required("Email is required")
      .test("email", "Invalid email", (value) => isValidEmail(value)),
    password: string()
      .required("Password is required")
      .test(
        "password",
        "Build a strong password: Combine 3 alphabets, 2 digits, 1 special symbol and ensure a minimum length of 8 characters.",
        (value) => isStrongPassword(value)
      ),
  });
