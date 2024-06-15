import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { showError, showSuccess, ToastOptions } from "../store/slices/Toast";

export const useToast = () => {
  const dispatch = useDispatch();

  const alertToast = useCallback(
    ({
      message = "Please try again",
      title = "Error",
      size = "regular",
    }: ToastOptions) => {
      return dispatch(showError({ message, title, size }));
    },
    []
  );

  const successToast = useCallback(
    ({ message, title = "Successful", size = "regular" }: ToastOptions) => {
      return dispatch(showSuccess({ message, title, size }));
    },
    []
  );

  return { alertToast, successToast };
};
