import classNames from "classnames";
import React, { FC } from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

type ConditionalLinkProps = {
  condition?: boolean;
  redirect: string;
  className?: string;
  children: ReactNode | string;
};

export const ConditionalLink = ({
  condition = true,
  redirect,
  className = "",
  children,
}: ConditionalLinkProps) => {
  if (condition) {
    return (
      <Link
        className={classNames(
          "text-surface-btnColor text-body-lg hover:text-dark_green",
          {
            [className]: Boolean(className),
          }
        )}
        to={redirect}
      >
        {children}
      </Link>
    );
  }
  return <div className="text-text-100 text-body-lg">{children}</div>;
};
