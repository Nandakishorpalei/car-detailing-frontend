import * as React from "react";
import { Formik, Form, FormikValues } from "formik";
import { signinUserFormSchema } from "../../FormValidations/signinUserFormValidation";
import { Input } from "../../UI-Components/Input/Input";
import { Button } from "../../UI-Components/Button/Button";
import { PhoneNumberInput } from "../../UI-Components/PhoneInput/PhoneInput";
import { phoneNumberSchema } from "../../FormValidations/PhoneNumberSchema";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../firebase/setup";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import { useToast } from "../../Hooks/useToast";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { CloseIcon } from "../../Icons/CloseIcon";

export const UserDetails = ({
  open,
  setOpen,
  disableClose,
}: {
  open: boolean;
  setOpen?: (val: boolean) => void;
  disableClose?: boolean;
}) => {
  const [user, setUser] = useState<null | ConfirmationResult>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const { alertToast } = useToast();

  const handleClose = () => {
    if (!disableClose) {
      setOpen?.(false);
    }
  };

  const sendOtp = async (values: FormikValues) => {
    try {
      console.log({ values });
      setLoading(true);
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      console.log({ recaptcha });
      const phoneNumber = "+" + values.phone;
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptcha
      );

      console.log(confirmation);
      setUser(confirmation);
      setOpen?.(false);
    } catch (error: any) {
      alertToast({ message: error.message || "Something went wrong!" });
    }
    setLoading(false);
  };

  const verifyOTP = async (values: FormikValues) => {
    try {
      setLoading(true);
      const result = user?.confirm(values.otp);
      console.log({ result });

      const payload = {
        name: values.name,
        phone: values.phone,
      };

      const { data } = await axios.post(
        process.env.NODE_APP_BASE_URL + "/signin",
        payload
      );
      login({ newAuthToken: data.token, newUser: data.user });
    } catch (error: any) {
      alertToast({ message: error.message || "Something went wrong!" });
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle className="border-b border-neutral-10 text-h4 flex justify-between items-center">
        Customer Details
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Formik
        initialValues={{
          name: "",
          phone: "",
          otp: "",
        }}
        onSubmit={user ? verifyOTP : sendOtp}
        validationSchema={() => phoneNumberSchema(user)}
        validateOnBlur
        validateOnChange
        validateOnMount={false}
      >
        {({ submitForm, values, setFieldValue }) => (
          <Form className="m-0">
            <DialogContent className="space-y-4">
              <Input required name="name" label="Name" customSize="small" />
              <div className="w-full">
                <PhoneNumberInput name="phone" label="Phone" required />
              </div>
              {Boolean(user) && (
                <Input name="otp" label="OTP" customSize="small" required />
              )}
              <div
                id="recaptcha"
                style={{ zIndex: 1001, position: "relative" }}
              ></div>
            </DialogContent>
            <DialogActions className="border border-l-0 border-r-0 border-b-0 border-neutral-10 py-3 px-6">
              {!disableClose && (
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
              )}
              <Button
                onClick={submitForm}
                customType="primary"
                isLoading={isLoading}
                disabled={isLoading}
              >
                {user ? "Verify OTP" : "Send OTP"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
