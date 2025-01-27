import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Form, Formik } from "formik";
import { useState } from "react";
import { Button } from "../../UI-Components/Button/Button";
import { ConditionalLink } from "../../UI-Components/ConditionalLink/ConditionalLink";
import { Input } from "../../UI-Components/Input/Input";
import ConditionalToolTip from "../../UI-Utils/ConditionalTooltip";

export const NewsLetter = () => {
  return (
    <div className="px-[15%] bg-surface-background flex py-8 flex-col gap-4 items-center">
      <b className="text-[40px] text-text-100">Subscribe to Newsletter</b>
      <div className="text-body text-text-60">
        Enter your email address to register to our newsletter subscription!
      </div>
      <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={() => {}}
      >
        {({ isValid, isSubmitting }) => {
          return (
            <Form className="w-2/3 flex-col flex space-y-4 items-center">
              <Input
                type="email"
                label=""
                name="email"
                placeholder="Enter your email"
                disabled
              />
              <Button type="submit" disabled customType="primary">
                Send
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
