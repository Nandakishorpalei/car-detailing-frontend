import { FC } from "react";
import { SIGNUP } from "../../Constant/auth";
import { ConditionalLink } from "../../UI-Components/ConditionalLink/ConditionalLink";
interface IProps {
  redirectTo: string;
}

export const AuthFooter: FC<IProps> = ({ redirectTo }) => {
  const forSignup = redirectTo === SIGNUP;
  const redirectPath = forSignup ? "/signup" : "/signin";
  const actionText = forSignup
    ? "Don't have an account?"
    : "Already have an account?";
  const linkText = forSignup ? "Sign Up" : "Sign In";

  return (
    <div className="flex gap-1 justify-center mt-8">
      <div className="text-body text-text-100">{actionText}</div>
      <ConditionalLink condition redirect={redirectPath}>
        <div className="text-body"> {linkText}</div>
      </ConditionalLink>
    </div>
  );
};
