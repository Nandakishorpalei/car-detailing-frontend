import * as Yup from "yup";

export const uploadProductSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  subtitle: Yup.string().required("Subtitle is required"),
  sizeAndPrice: Yup.array().of(
    Yup.object().shape({
      price: Yup.string().required("Price is required"),
      quantityAvailable: Yup.number()
        .typeError("Quantity must be a number")
        .required("Quantity is required")
        .positive("Quantity must be a positive number"),
    })
  ),
});
