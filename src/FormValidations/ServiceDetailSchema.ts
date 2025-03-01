import { object, string } from "yup";

export const serviceDetialSchema = () =>
  object({
    model: string().min(1).required("Model is required"),
    registration_number: string().min(1).required("Registration number is required"),
    color: string().min(1).required("Color is required"),
    year: string().min(1).required("Year is required"),
  });
