import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DashBoardProps {
  pageTitle: string;
}

const initialState: DashBoardProps = {
  pageTitle: "Product",
};

export const dashboard = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setPageTitle: (state, action: PayloadAction<string>) => {
      state.pageTitle = action.payload;
    },
  },
});

export const { setPageTitle } = dashboard.actions;

export default dashboard.reducer;
