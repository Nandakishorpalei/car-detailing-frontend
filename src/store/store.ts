import { configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
import { logOutUser } from "../utils/logOut";
import { emptyApi } from "./api/emptyApi";
import dashboard from "./slices/Dashboard";
import auth from "./slices/Auth";
import toast from "./slices/Toast";

export const store = configureStore({
  reducer: {
    [emptyApi.reducerPath]: emptyApi.reducer,
    dashboard,
    auth,
    toast
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(emptyApi.middleware)
      .concat((store) => (next) => (action) => {
        if (
          isRejectedWithValue(action) &&
          Number(action.payload.status) === 401
        ) {
          logOutUser();
          return;
        }
        return next(action);
      }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
