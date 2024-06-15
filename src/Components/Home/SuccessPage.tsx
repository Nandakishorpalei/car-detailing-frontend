import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

export const SuccessPage = () => {
  const { login } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userData = decodeURIComponent(searchParams.get("userdata") || "");
  const token = decodeURIComponent(searchParams.get("token") || "");

  useEffect(() => {
    const user = Boolean(userData) ? JSON.parse(userData) : userData;
    login({ newAuthToken: token, newUser: user });
  }, [login, token, userData]);
  return (
    <div className="h-screen w-screen bg-green flex justify-center items-center text-surface">
      Google login successfull
    </div>
  );
};
