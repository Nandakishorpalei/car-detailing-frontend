import { Form, Formik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GreenTick } from "../../Icons/GreenTick";
import {
  useSendOtpToMailMutation,
  useVerifyEmailMutation,
} from "../../store/api/verifyEmail";
import {
  useSendOtpToPhoneMutation,
  useVerifyPhoneMutation,
} from "../../store/api/verifyPhone";
import { setUser } from "../../store/slices/Auth";
import { RootState } from "../../store/store";
import { Button } from "../../UI-Components/Button/Button";
import { Card } from "../../UI-Components/Card/Card";
import { Header } from "../../UI-Components/Header/Header";
import { Input } from "../../UI-Components/Input/Input";
import { Phone } from "../../UI-Components/Phone/Phone";
import { isValidPhoneNumber } from "react-phone-number-input";
import { sweetAlert } from "../../utils/SweetAlert";
import { usePageTitle } from "../../Hooks/usePageTitle";

interface IVerifyUserProps {}

export const VerifyUser: FC<IVerifyUserProps> = (props) => {
  usePageTitle("Verify");
  const [canSendEmailOtpTimer, setCanSendEmailOtpTimer] = useState(0);
  const [canSendPhoneOtpTimer, setCanSendPhoneOtpTimer] = useState(0);
  const { user } = useSelector((state: RootState) => state.auth);
  const { firstName, lastName, email, phone, isMailVerified } = user || {};
  const [sendOtpToEmail] = useSendOtpToMailMutation();
  const [verifyEmail, { isLoading: isEmailVerifying }] =
    useVerifyEmailMutation();
  const [sendOtpToPhone] = useSendOtpToPhoneMutation();
  const [verifyPhone, { isLoading: isPhoneVerifying }] =
    useVerifyPhoneMutation();
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    console.log("canSendEmailOtpTimer:", canSendEmailOtpTimer);
  }, [canSendEmailOtpTimer]);

  const sendEmailOtp = async () => {
    try {
      setCanSendEmailOtpTimer(30);
      const resendTimer = setInterval(() => {
        setCanSendEmailOtpTimer((prev) => {
          if (prev === 1) {
            clearInterval(resendTimer);
          }
          return prev - 1;
        });
      }, 1000);

      const res = await sendOtpToEmail({ email: email! }).unwrap();
      console.log({ res });
      sweetAlert(res.message);
    } catch (e: any) {
      console.log({ e });
      sweetAlert(e.message);
    }
  };

  const handleVerifyEmail = async ({ emailOtp }: { emailOtp: string }) => {
    try {
      const res = await verifyEmail({ email: email!, otp: emailOtp }).unwrap();
      dispatch(setUser(res.data));
    } catch (e: any) {
      console.log({ e });
      sweetAlert(e.message);
    }
  };

  const sendPhoneOtp = async ({ phone }: { phone: string }) => {
    try {
      setCanSendPhoneOtpTimer(30);
      const resendTimer = setInterval(
        () =>
          setCanSendPhoneOtpTimer((prev) => {
            if (prev === 1) {
              clearInterval(resendTimer);
            }
            return prev - 1;
          }),
        1000
      );
      const res = await sendOtpToPhone({
        email: email!,
        phone: phone!,
      }).unwrap();
      setPhoneNumber(phone);
      dispatch(setUser(res.data));
      sweetAlert(res.message);
    } catch (e: any) {
      console.log({ e });
      sweetAlert(e.message);
    }
  };

  const handleVerifyPhone = async ({ phoneOtp }: { phoneOtp: string }) => {
    try {
      const res = await verifyPhone({
        phone: phone! || phoneNumber,
        otp: phoneOtp,
      }).unwrap();
      dispatch(setUser(res.data));
    } catch (e: any) {
      console.log({ e });
      sweetAlert(e.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="w-screen h-[calc(100vh-65px)] flex items-center justify-center">
        <Card className="w-3/5 max-h-2/3 p-8 flex flex-col justify-between">
          <div className="text-body-lg text-text-100 mb-6">
            Hello there,{" "}
            <b>
              {firstName} {lastName}!
            </b>{" "}
            Ensuring your security is of utmost importance to us. To get
            started, please take a moment to confirm your email and phone
            number.
          </div>

          <div className="w-full">
            <Formik
              initialValues={{
                email: email,
              }}
              onSubmit={sendEmailOtp}
            >
              {({ isValid }) => {
                return (
                  <Form className="mb-4">
                    <div className="flex gap-4 items-end justify-between">
                      <div className="w-3/4">
                        <Input
                          type="email"
                          label="Email"
                          name="email"
                          placeholder="Enter your email"
                          disabled
                          block
                        />
                      </div>
                      <div className="w-1/4">
                        <Button
                          width="w-40"
                          size="large"
                          type="submit"
                          block
                          disabled={
                            canSendEmailOtpTimer !== 0 ||
                            !isValid ||
                            isMailVerified
                          }
                        >
                          {isMailVerified ? (
                            <div>Verified</div>
                          ) : (
                            <>
                              GET OTP{" "}
                              {canSendEmailOtpTimer !== 0 && (
                                <>({canSendEmailOtpTimer})</>
                              )}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
            {!isMailVerified && (
              <Formik
                initialValues={{
                  emailOtp: "",
                }}
                onSubmit={handleVerifyEmail}
              >
                {({ values, isValid, isSubmitting, setFieldValue }) => {
                  return (
                    <Form className="mb-4">
                      <div className="flex gap-4 items-end justify-between">
                        <div className="w-3/4">
                          <Input
                            type="text"
                            label="Email OTP"
                            name="emailOtp"
                            placeholder="Enter your OTP"
                            block
                          />
                        </div>
                        <div className="w-1/4">
                          <Button
                            width="w-40"
                            size="large"
                            block
                            customType="primary"
                            type="submit"
                            disabled={isSubmitting || isEmailVerifying}
                            isLoading={isEmailVerifying}
                          >
                            VERIFY EMAIL
                          </Button>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            )}
            <Formik
              initialValues={{
                phone: phone || "",
              }}
              onSubmit={sendPhoneOtp}
            >
              {({ values, isValid, isSubmitting, setFieldValue }) => {
                return (
                  <Form className="mb-4">
                    <div className="flex gap-4 items-end justify-between">
                      <div className="w-3/4">
                        <Phone
                          phone={values.phone}
                          setPhone={(phone: string) =>
                            setFieldValue("phone", phone)
                          }
                        />
                      </div>
                      <div className="w-1/4">
                        <Button
                          width="w-40"
                          size="large"
                          block
                          type="submit"
                          customType="primary"
                          disabled={
                            canSendPhoneOtpTimer !== 0 ||
                            !isValid ||
                            !isValidPhoneNumber(values.phone)
                          }
                        >
                          GET OTP
                          {canSendPhoneOtpTimer !== 0 && (
                            <>({canSendPhoneOtpTimer})</>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
            <Formik
              initialValues={{
                phoneOtp: "",
              }}
              onSubmit={handleVerifyPhone}
            >
              {({ isValid }) => {
                return (
                  <Form className="mb-4">
                    <div className="flex gap-4 items-end justify-between">
                      <div className="w-3/4">
                        <Input
                          type="text"
                          label="Phone OTP"
                          name="phoneOtp"
                          placeholder="Enter your OTP"
                          block
                        />
                      </div>
                      <div className="w-1/4">
                        <Button
                          width="w-40"
                          type="submit"
                          disabled={!isValid || isPhoneVerifying}
                          isLoading={isPhoneVerifying}
                          size="large"
                          customType="primary"
                          block
                        >
                          VERIFY PHONE
                        </Button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </Card>
      </div>
    </div>
  );
};
