import classNames from "classnames";
import { ReactNode } from "react";
import useAuth from "../../Hooks/useAuth";
import { RootState } from "../../store/store";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";
import { ConditionalLink } from "../ConditionalLink/ConditionalLink";
import { NavMenu } from "../../Components/NavBar/NavMenu";
import { ProfileMenu } from "../../Components/NavBar/ProfileMenu";
import BrandLogo from "../../images/BrandLogo.png";

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
        `sticky top-0 z-header gap-4 border-x-0 border-b border-t-0 border-solid border-i-neutral-10 bg-surface px-6 py-3 sm:flex-wrap`,
        className || ""
      )}
    >
      <div className="flex w-full items-center justify-between gap-2 sm:flex-wrap">
        <div className="flex gap-4 items-center">
          <NavMenu />
          <img
            src={BrandLogo}
            alt="BrandLogo"
            className="max-h-[38px] max-w-[38px]"
          />
          <div className="flex items-center justify-between gap-2 text-i-primary-100">
            <h5 className="!m-0 text-h5">{pageTitle}</h5>
            {left}
          </div>
        </div>
        <div className="flex gap-4">
          {right}
          {isSignin && (
            <ConditionalLink condition redirect="/signup">
              <Button customType="primary">Sign up</Button>
            </ConditionalLink>
          )}
          {isSignup && (
            <ConditionalLink condition redirect="/signin">
              <Button customType="primary">Sign in</Button>
            </ConditionalLink>
          )}
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
};
