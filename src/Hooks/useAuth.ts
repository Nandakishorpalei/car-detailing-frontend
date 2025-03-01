import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { User } from "../store/model/User";
import { REDIRECT_AFTER_AUTH, RESTRICTED_ROUTES } from "../Constant/auth";
import { useDispatch } from "react-redux";
import { setAuthenticated, setAuthToken, setUser } from "../store/slices/Auth";

interface AuthData {
  login: ({
    newAuthToken,
    newUser,
  }: {
    newAuthToken: string;
    newUser: User;
  }) => void;
  logout: () => void;
  isLoading: boolean;
}

const useAuth = (): AuthData => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Load auth token and user from local storage
    const savedAuthToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("user");

    if (savedAuthToken && savedUser) {
      dispatch(setAuthToken(savedAuthToken));
      dispatch(setUser(JSON.parse(savedUser)));
      dispatch(setAuthenticated(true));
    }
    setLoading(false);
  }, []);

  // Update local storage and state with new auth token and user
  const login = ({
    newAuthToken,
    newUser,
  }: {
    newAuthToken: string;
    newUser: User;
  }) => {
    localStorage.setItem("authToken", newAuthToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    dispatch(setAuthToken(newAuthToken));
    dispatch(setUser(newUser));
    dispatch(setAuthenticated(true));
  };

  // Clear local storage and reset state
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    dispatch(setAuthToken(null));
    dispatch(setUser(null));
    dispatch(setAuthenticated(false));
    navigate("/");
  };

  return {
    login,
    logout,
    isLoading: false,
  };
};

export default useAuth;
