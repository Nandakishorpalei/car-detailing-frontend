import cx from "classnames";
import React, { HTMLAttributes, forwardRef } from "react";

type DashboardContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Header = ({
  children,
  className,
  sticky,
}: DashboardContainerProps & { sticky?: boolean }) => (
  <div
    className={cx("flex-[0_0_auto]", className || "", {
      "sticky top-0 bg-white z-header": sticky,
    })}
  >
    {children}
  </div>
);

const Content = ({
  children,
  className = "",
  ...props
}: DashboardContainerProps & HTMLAttributes<HTMLDivElement>) => (
  <div className={cx("flex-auto overflow-y-auto", className)} {...props}>
    {children}
  </div>
);

const DashboardContainer = Object.assign(
  forwardRef<HTMLDivElement, DashboardContainerProps>(
    ({ children, className }, ref) => {
      return (
        <div ref={ref} className={cx("flex flex-col w-full", className || "")}>
          {children}
        </div>
      );
    }
  ),
  {
    Header,
    Content,
  }
);

export default DashboardContainer;
