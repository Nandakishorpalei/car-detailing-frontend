import axios from "axios";
import { FormikValues } from "formik";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import { usePageTitle } from "../../Hooks/usePageTitle";
import { UserPayload } from "../../store/model/User";
import { Card } from "../../UI-Components/Card/Card";
import { Header } from "../../UI-Components/Header/Header";
import { sweetAlert } from "../../utils/SweetAlert";
import { SignupUserForm } from "./SignupUserForm";

export const Signup = () => {
  const { login } = useAuth();

  const handleSubmit = async (payload: UserPayload) => {
    try {
      const { data } = await axios.post(
        process.env.NODE_APP_BASE_URL + "/signup",
        payload
      );
      login({ newAuthToken: data.token, newUser: data.user });
    } catch (e: any) {
      sweetAlert(e?.response?.data?.message);
    }
  };
  return (
    <div>
      <Header isSignup />
      <div className="w-screen h-[calc(100vh-65px)] flex justify-center items-center">
        <Card className="w-[500px] p-4 max-h-full overflow-scroll">
          <SignupUserForm onSubmit={handleSubmit} />
        </Card>
      </div>
    </div>
  );
};
