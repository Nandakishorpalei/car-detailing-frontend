import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import axios from "axios";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { Form, Formik, FormikValues } from "formik";
import { useState } from "react";
import { auth } from "../../firebase/setup";
import { phoneNumberSchema } from "../../FormValidations/PhoneNumberSchema";
import { useToast } from "../../Hooks/useToast";
import { Button } from "../../UI-Components/Button/Button";
import { Input } from "../../UI-Components/Input/Input";
import { PhoneNumberInput } from "../../UI-Components/PhoneInput/PhoneInput";
import { usersApi } from "../../store/api/user";
import { useDispatch } from "react-redux";
import { CloseIcon } from "../../Icons/CloseIcon";

export const AddCustomer = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen?: (val: boolean) => void;
}) => {
  const [user, setUser] = useState<null | ConfirmationResult>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { alertToast, successToast } = useToast();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen?.(false);
  };

  const sendOtp = async (values: FormikValues) => {
    try {
      setLoading(true);
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});

      const phoneNumber = "+" + values.phone;
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptcha
      );

      setUser(confirmation);
    } catch (error: any) {
      alertToast({ message: error.message || "Something went wrong!" });
    }
    setLoading(false);
  };

  const verifyOTP = async (values: FormikValues) => {
    try {
      setLoading(true);
      const result = user?.confirm(values.otp);

      const payload = {
        name: values.name,
        phone: values.phone,
      };

      await axios.post(process.env.NODE_APP_BASE_URL + "/signin", payload);
      successToast({ message: "Customer added successfully!" });
      dispatch(usersApi.util.invalidateTags(["Users"]));
      setOpen?.(false);
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
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
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
