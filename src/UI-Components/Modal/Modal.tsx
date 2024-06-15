import * as RDialog from "@radix-ui/react-dialog";
import cx from "classnames";
import { forwardRef, Fragment, HTMLAttributes } from "react";
import { CloseIcon } from "../../Icons/CloseIcon";
import { Button } from "../Button/Button";

enum ModalSize {
  small = "w-[440px]",
  regular = "w-[560px]",
  large = "w-[680px]",
  xl = "w-[960px]",
}

type ModalProps = {
  children?: React.ReactNode;
  size?: keyof typeof ModalSize;
  props?: RDialog.DialogContentProps;
};

const preventClose = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === " " || e.key === "Spacebar" || e.key === "Enter") {
    e.preventDefault();
  }
};

const Header = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cx(
        "flex flex-shrink-0 items-center justify-between border-0 border-b border-solid border-b-neutral-0 py-4 pl-6 pr-4",
        props.className || ""
      )}
    />
  );
};

const Title = (
  props: RDialog.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>
) => {
  return (
    <RDialog.Title
      asChild
      className={cx("mb-0 text-subtitle" || props.className || "")}
      {...props}
    >
      <h5>{props?.children}</h5>
    </RDialog.Title>
  );
};

const Subtitle = (props: RDialog.DialogDescriptionProps) => {
  return (
    <RDialog.Description
      {...props}
      className={cx(
        "mb-0 mt-2 text-subtext-sm text-neutral-30",
        props.className || ""
      )}
    />
  );
};

const Close = (props: RDialog.DialogCloseProps) => (
  <RDialog.Close
    {...props}
    className={cx(
      "all:unset -translate-y-[6px] self-start",
      props.className || ""
    )}
    asChild
  >
    <Button customType="ghost" size="small">
      <div className="h-4 w-4 mt-3">
        <CloseIcon />
      </div>
    </Button>
  </RDialog.Close>
);

const Body = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cx("overflow-scroll px-8 py-5", props.className || "")}
    />
  );
};

const Footer = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cx(
        "flex-shrink-0 px-6 py-4 border-0 border-t border-solid border-neutral-0",
        props.className || ""
      )}
    />
  );
};

const Content = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, size = "regular", props }: ModalProps, forwardedRef) => {
    return (
      <RDialog.Portal>
        <Overlay />
        <RDialog.Content
          {...props}
          onKeyDown={preventClose}
          className={cx(
            "fixed left-1/2 top-1/2 z-modal flex max-h-[680px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white",
            ModalSize[size]
          )}
          ref={forwardedRef}
        >
          {children}
        </RDialog.Content>
      </RDialog.Portal>
    );
  }
);

const Overlay = ({
  ...props
}: RDialog.DialogOverlayProps & React.RefAttributes<HTMLDivElement>) => (
  <RDialog.Overlay
    {...props}
    className={cx(
      "fixed inset-0 z-overlay bg-text-100 opacity-20",
      props.className || ""
    )}
  />
);

const Modal = {
  ...RDialog,
  Header,
  Title,
  Subtitle,
  Close,
  Body,
  Footer,
  Content,
  Overlay,
};

export default Modal;
