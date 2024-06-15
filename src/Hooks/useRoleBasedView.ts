import { useSelector } from "react-redux";
import { CUSTOMER, SELLER } from "../Constant/auth";
import { RootState } from "../store/store";

export const useRoleBasedView = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    return {};
  }

  const { role } = user || { role: CUSTOMER };

  return {
    isCustomer: role === CUSTOMER,
    isSeller: role === SELLER,
  };
};
