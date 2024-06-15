import React from "react";

interface WrapperProps {
  noWrapper?: boolean;
  children: React.ReactNode;
  wrapperClassName?: string;
}

const Wrapper: React.FC<WrapperProps> = ({
  noWrapper = false,
  wrapperClassName = "flex w-screen h-screen justify-center items-center",
  children,
}) => {
  if (noWrapper) {
    return <>{children}</>;
  }

  return <div className={wrapperClassName}>{children}</div>;
};

export default Wrapper;
