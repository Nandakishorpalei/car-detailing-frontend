import React from "react";
import { GoogleIcon } from "../../Icons/GoogleIcon";
import { Button } from "../../UI-Components/Button/Button";

const GoogleLoginButton = () => {
  const baseUrl = process.env.NODE_APP_BASE_URL;
  const handleGoogleLogin = () => {
    window.location.href = `${baseUrl}/auth/google`;
  };

  return (
    <Button type="button" block onClick={handleGoogleLogin}>
      <GoogleIcon />
      <span>Continue with Google</span>
    </Button>
  );
};

export default GoogleLoginButton;
