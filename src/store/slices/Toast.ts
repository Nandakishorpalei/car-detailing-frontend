import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastSizeType } from "../../Components/Toast/Toast";


export type ToastOptions = {
  message?: string;
  title?: string;
  size?: ToastSizeType;
};

export type TransactionState = {
  error: ToastOptions | null;
  success: ToastOptions | null;
};

const initialState: TransactionState = {
  error: null,
  success: null,
};

export const toast = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showError: (state, action: PayloadAction<TransactionState["error"]>) => {
      state.error = action.payload;
    },
    showSuccess: (
      state,
      action: PayloadAction<TransactionState["success"]>
    ) => {
      state.success = action.payload;
    },
  },
});

export const { showError, showSuccess } = toast.actions;

export default toast.reducer;
