import classNames from "classnames";
import { ReactNode } from "react";
import useAuth from "../../Hooks/useAuth";
import { RootState } from "../../store/store";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";
import { ConditionalLink } from "../ConditionalLink/ConditionalLink";
import { NavMenu } from "../../Components/NavBar/NavMenu";
import { ProfileMenu } from "../../Components/NavBar/ProfileMenu";
//@ts-ignore
import  BrandLogo from "../../static/images/BrandLogoGreen.png"

type HeadersProps = {
  right?: ReactNode;
  title?: string | ReactNode;
  left?: ReactNode;
  className?: string;
  isSignin?: boolean;
  isSignup?: boolean;
};

export const Header = ({
  right,
  left,
  className,
  isSignin,
  isSignup,
}: HeadersProps) => {
  const { pageTitle } = useSelector((state: RootState) => state.dashboard);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <div
      className={classNames(
        `sticky top-0 z-header gap-4 bg-surface px-[15%] sm:px-[4%] py-3 sm:flex-wrap`,
        className || ""
      )}
    >
      <div className="flex w-full items-center justify-between gap-2 sm:flex-wrap">
        <ConditionalLink condition redirect="/">
        <img src={BrandLogo} alt="BrandLogo" className="h-12 w-[84px] sm:h-8 sm:w-14 rounded-lg" />
        </ConditionalLink>
        <div className="flex gap-4">
          {isAuthenticated && <NavMenu />}
          {isSignin && (
            <ConditionalLink condition redirect="/signup">
              <Button customType="primary">Sign Up</Button>
            </ConditionalLink>
          )}
          {isSignup && (
            <ConditionalLink condition redirect="/signin">
              <Button customType="primary">Sign In</Button>
            </ConditionalLink>
          )}
        </div>
      </div>
    </div>
  );
};
