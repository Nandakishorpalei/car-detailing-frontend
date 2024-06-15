import React from "react";
import { GoogleIcon } from "../../Icons/GoogleIcon";
import { Button } from "../../UI-Components/Button/Button";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  return (
    <Button type="button" block onClick={handleGoogleLogin}>
      <GoogleIcon />
      <span>Continue with Google</span>
    </Button>
  );
};

export default GoogleLoginButton;
