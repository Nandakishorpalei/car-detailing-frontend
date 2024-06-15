import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useUserData = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    return {};
  }

  return {
    user,
  };
};
