import { Form, FormikValues } from "formik";
import { Formik } from "formik";
import { signinUserFormSchema } from "../../FormValidations/signinUserFormValidation";
import { Input } from "../../UI-Components/Input/Input";
import { Button } from "../../UI-Components/Button/Button";
import Modal from "../../UI-Components/Modal/Modal";
import { auth } from "../../firebase/setup";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  User,
  reload,
} from "firebase/auth";
import { useState, useEffect } from "react";

export const EmailVerification = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Listen for auth state changes to update the user
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsVerified(currentUser.emailVerified);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignUp = async (values: FormikValues) => {
    try {
      const { email, password } = values;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      console.log("Verification email sent!");
      setUser(user);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleCheckVerification = async () => {
    try {
      if (user) {
        await reload(user); // Refresh user state
        setIsVerified(user.emailVerified);
        console.log("Email verification status:", user.emailVerified);
      }
    } catch (error) {
      console.error("Error checking verification:", error);
    }
  };

  return (
    <Modal.Root open={true} onOpenChange={() => {}}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSignUp}
        validationSchema={signinUserFormSchema}
        validateOnBlur
        validateOnChange
        validateOnMount={false}
      >
        {({ submitForm }) => (
          <Form className="m-0">
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Email Verification</Modal.Title>
                <Modal.Close />
              </Modal.Header>

              <Modal.Body className="space-y-6 mb-6 !overflow-hidden">
                {!user ? (
                  <>
                    <Input
                      required
                      name="email"
                      label="Email"
                      customSize="small"
                    />
                    <Input
                      required
                      name="password"
                      label="Password"
                      customSize="small"
                      type="password"
                    />
                  </>
                ) : (
                  <div>
                    {isVerified ? (
                      <p className="text-green-600">Email is verified!</p>
                    ) : (
                      <p className="text-red-600">
                        Please verify your email. Check your inbox.
                      </p>
                    )}
                  </div>
                )}
              </Modal.Body>

              <Modal.Footer>
                <div className="flex justify-end gap-4">
                  <Button type="button">Cancel</Button>
                  {!user ? (
                    <Button
                      onClick={submitForm}
                      customType="primary"
                      type="submit"
                      isLoading={false}
                      disabled={false}
                    >
                      Sign Up
                    </Button>
                  ) : (
                    <Button
                      onClick={handleCheckVerification}
                      customType="primary"
                      type="button"
                      isLoading={false}
                      disabled={isVerified}
                    >
                      Check Verification
                    </Button>
                  )}
                </div>
              </Modal.Footer>
            </Modal.Content>
          </Form>
        )}
      </Formik>
    </Modal.Root>
  );
};
