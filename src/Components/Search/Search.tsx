import classNames from "classnames";
import { InputHTMLAttributes } from "react";

export type SearchProps = {
  customSize?: "small" | "regular" | "large";
  block?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const INPUT_TYPE_CLASSES = {
  /* @tw */
  SMALL: "h-8",
  /* @tw */
  REGULAR: "h-10",
  /* @tw */
  LARGE: "h-12",
};

export const Search = ({
  block = false,
  customSize = "small",
  ...props
}: SearchProps) => {
  return (
    <input
      {...props}
      placeholder={props.placeholder || "Search"}
      type="search"
      className={classNames(
        "rounded border border-solid border-neutral-10 shadow-light-100 bg-surface-lighter-grey bg-[url('static/images/SearchIcon.svg')] bg-[10px] bg-no-repeat px-3 pl-8 text-body font-normal text-text-30 hover:border-green hover:bg-surface-grey focus:border-green focus:bg-surface outline-none",
        props.className,
        {
          "t-w-full": block,
          [INPUT_TYPE_CLASSES.SMALL]: customSize === "small",
          [INPUT_TYPE_CLASSES.REGULAR]: customSize === "regular",
          [INPUT_TYPE_CLASSES.LARGE]: customSize === "large",
        }
      )}
    />
  );
};
