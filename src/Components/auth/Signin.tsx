import axios from "axios";
import React from "react";
import { BACKEND_URL } from "../../Constant/auth";
import useAuth from "../../Hooks/useAuth";
import { usePageTitle } from "../../Hooks/usePageTitle";
import { Card } from "../../UI-Components/Card/Card";
import { Header } from "../../UI-Components/Header/Header";
import { sweetAlert } from "../../utils/SweetAlert";
import { SigninUserForm } from "./SigninUserForm";

export const Signin = () => {
  usePageTitle("Sign in");
  const { login } = useAuth(); // Destructure the login function
  const handleSubmit = async (payload: { email: string; password: string }) => {
    try {
      const { data } = await axios.post(BACKEND_URL + "/signin", payload);
      login({ newAuthToken: data.token, newUser: data.user });
    } catch (e: any) {
      sweetAlert(e?.response?.data?.message);
    }
  };
  return (
    <>
      <Header isSignin />
      {/* height needs to be checked */}
      <div className="w-screen h-[calc(100vh-65px)] flex justify-center items-center">
        <Card className="w-[500px] p-4 max-h-full overflow-scroll">
          <SigninUserForm onSubmit={handleSubmit} />
        </Card>
      </div>
    </>
  );
};
