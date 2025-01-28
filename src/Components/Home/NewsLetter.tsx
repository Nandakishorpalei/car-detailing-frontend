import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Form, Formik } from "formik";
import { BACKEND_URL } from "../../Constant/auth";
import { newsLetterSchema } from "../../FormValidations/newsLetterSchema";
import { useToast } from "../../Hooks/useToast";
import { Button } from "../../UI-Components/Button/Button";
import { ConditionalLink } from "../../UI-Components/ConditionalLink/ConditionalLink";
import { Input } from "../../UI-Components/Input/Input";

export const NewsLetter = () => {
  const { alertToast, successToast } = useToast();

  const handleSubscribe = async ({ email }: { email: string }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        successToast({ message: data.message || "Subscribed successfully!" });
      } else {
        alertToast({ message: data.message || "Something went wrong!" });
      }
    } catch (err: any) {
      alertToast({ message: err.message || "Something went wrong!" });
    }
  };
  

  return (
    <div className="px-[15%] bg-surface-background flex py-8 flex-col gap-4 items-center">
      <b className="text-[40px] text-text-100 sm:text-center">Subscribe to Newsletter</b>
      <div className="text-body text-text-60 sm:text-center">
        Enter your email address to register to our newsletter subscription!
      </div>
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={handleSubscribe}
        validationSchema={newsLetterSchema}
      >
        {({isValid, isSubmitting, submitForm }) => {
          return (
            <Form className="w-2/3 flex-col flex space-y-4 items-center">
              <Input
                type="email"
                label=""
                name="email"
                placeholder="Enter your email"
              />
              <Button type="submit" disabled={isSubmitting || !isValid} onClick={submitForm} customType="primary" isLoading={isSubmitting}>
                Subscribe
              </Button>
            </Form>
          );
        }}
      </Formik>

      <div className="mt-16 flex gap-8 items-center">
        <ConditionalLink condition redirect="https://www.facebook.com/">
          <div>
            <Button customType="transparent">
              <FacebookIcon />
            </Button>
          </div>
        </ConditionalLink>
        <ConditionalLink condition redirect="https://www.x.com/">
          <div>
            <Button customType="transparent">
              <TwitterIcon />
            </Button>
          </div>
        </ConditionalLink>
        <ConditionalLink condition redirect="https://www.youtube.com/">
          <div>
            <Button customType="transparent">
              <YouTubeIcon />
            </Button>
          </div>
        </ConditionalLink>
        <ConditionalLink condition redirect="https://www.instagram.com/">
          <div>
            <Button customType="transparent">
              <InstagramIcon />
            </Button>
          </div>
        </ConditionalLink>
      </div>
    </div>
  );
};
