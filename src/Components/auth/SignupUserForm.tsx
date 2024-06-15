import { Form, Formik } from "formik";
import React from "react";
import { signupUserFormSchema } from "../../FormValidations/signupUserFormValidation";
import { Button } from "../../UI-Components/Button/Button";
import { Checkbox } from "../../UI-Components/Checkbox/Checkbox";
import { Input } from "../../UI-Components/Input/Input";
import { AuthFooter } from "./AuthFooter";
import { SIGNIN } from "../../Constant/auth";
import { UserPayload } from "../../store/model/User";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";

export const SignupUserForm = ({
  onSubmit,
}: {
  onSubmit: (v: UserPayload) => void;
}) => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        termsConditions: false,
      }}
      onSubmit={onSubmit}
      validationSchema={signupUserFormSchema}
      validateOnBlur
      validateOnChange={false}
      validateOnMount={false}
    >
      {({ values, isValid, isSubmitting, setFieldValue }) => {
        return (
          <Form className="w-full space-y-4 p-6">
            <div className="flex gap-6">
              <Input
                type="text"
                label="First Name"
                name="firstName"
                placeholder="Enter your first name"
              />
              <Input
                type="text"
                label="Last Name"
                name="lastName"
                placeholder="Enter your last name"
              />
            </div>
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
            <Checkbox
              label="I agree to terms and conditions"
              name="termsConditions"
              onChange={(e) =>
                setFieldValue("termsConditions", e.target.checked)
              }
            />
            <div className="w-full flex items-center flex-col gap-4 !mt-6">
              <Button
                type="submit"
                disabled={!isValid || !values.termsConditions || isSubmitting}
                isLoading={isSubmitting}
                customType="primary"
                block
              >
                submit
              </Button>
              <div className="font-sans text-button text-neutral-80">or</div>
              <GoogleLoginButton />
            </div>
            <AuthFooter redirectTo={SIGNIN} />
          </Form>
        );
      }}
    </Formik>
  );
};
