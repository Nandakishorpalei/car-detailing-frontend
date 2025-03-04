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
import BrandLogo from "../../static/images/BrandLogo.png";

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

  return (
    <div
      className={classNames(
        `sticky top-0 z-header gap-4 bg-surface px-[15%] sm:px-[4%] py-0 sm:py-1 sm:flex-wrap`,
        className || ""
      )}
    >
      <div className="flex w-full items-center justify-between gap-2 sm:flex-wrap">
        <ConditionalLink redirect="/">
          <img
            src={BrandLogo}
            alt="BrandLogo"
            className="h-14 w-[64px] sm:h-10 sm:w-10 rounded-lg"
          />
        </ConditionalLink>
        <div className="flex gap-4">
          <NavMenu />
          {isSignin && (
            <ConditionalLink redirect="/signup">
              <Button customType="primary">Sign Up</Button>
            </ConditionalLink>
          )}
          {isSignup && (
            <ConditionalLink redirect="/signin">
              <Button customType="primary">Sign In</Button>
            </ConditionalLink>
          )}
        </div>
      </div>
    </div>
  );
};
