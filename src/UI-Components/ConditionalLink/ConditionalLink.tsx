import React, { FC } from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
interface IConditionalLinkProps {
  condition: boolean;
  redirect: string;
  children: ReactNode | string;
}

export const ConditionalLink: FC<IConditionalLinkProps> = ({
  condition,
  redirect,
  children,
}) => {
  if (condition) {
    return (
      <Link
        className="text-surface-btnColor text-body-lg hover:text-dark_green"
        to={redirect}
      >
        {children}
      </Link>
    );
  }
  return <div className="text-text-100 text-body-lg">{children}</div>;
};
