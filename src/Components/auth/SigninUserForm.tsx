import { Form, Formik, FormikValues } from "formik";
import React from "react";
import { SIGNUP } from "../../Constant/auth";
import { signinUserFormSchema } from "../../FormValidations/signinUserFormValidation";
import { Button } from "../../UI-Components/Button/Button";
import { Input } from "../../UI-Components/Input/Input";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";
import { AuthFooter } from "./AuthFooter";

export const SigninUserForm = ({
  onSubmit,
}: {
  onSubmit: (v: { email: string; password: string }) => void;
}) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={onSubmit}
      validationSchema={signinUserFormSchema}
      validateOnBlur
      validateOnChange={false}
      validateOnMount={false}
    >
      {({ isValid, isSubmitting }) => {
        return (
          <Form className="w-full space-y-4 p-6">
            <Input
              type="email"
              label="Email"
              name="email"
              placeholder="Enter your email"
            />
            <Input
              type="password"
              label="Password"
              name="password"
              placeholder="Enter your password"
            />

            <div className="w-full flex items-center flex-col gap-4 !mt-6">
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                isLoading={isSubmitting}
                customType="primary"
                block
              >
                submit
              </Button>
              <div className="font-sans text-button text-neutral-80">or</div>
              <GoogleLoginButton />
            </div>
            <AuthFooter redirectTo={SIGNUP} />
          </Form>
        );
      }}
    </Formik>
  );
};
