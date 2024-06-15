import classNames from "classnames";
import React from "react";
import { ReactNode } from "react";

export const Card = ({
  className = "w-80",
  children,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}) => {
  return (
    <div
      className={classNames("rounded-lg bg-surface !shadow-card", {
        [className]: true,
      })}
      onClick={(e) => onClick?.(e)}
    >
      {children}
    </div>
  );
};
