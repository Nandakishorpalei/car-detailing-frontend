import * as RDialog from "@radix-ui/react-dialog";
import cx from "classnames";
import { Form, Formik, FormikConfig, FormikValues } from "formik";
import { forwardRef, HTMLAttributes, ReactNode, useEffect } from "react";
import { Button } from "../Button/Button";

enum ModalSize {
  small = "t-w-[440px]",
  regular = "t-w-[560px]",
  large = "t-w-[680px]",
  xl = "t-w-[960px]",
  xxl = "t-w-[1140px]",
  xxxl = "t-w-screen",
  fullscreen = "t-w-full t-h-full",
}

type ModalProps = {
  asChild?: boolean;
  children?: ReactNode;
  size?: keyof typeof ModalSize;
  useCustomOverlay?: boolean;
  className?: string;
} & RDialog.DialogContentProps;

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
        "t-flex t-flex-shrink-0 t-items-center t-justify-between t-border-0 t-border-b t-border-solid t-border-b-neutral-0 t-py-4 t-pl-8 t-pr-4",
        props.className || ""
      )}
    />
  );
};

const Title = (
  props: RDialog.DialogTitleProps &
    React.RefAttributes<HTMLHeadingElement> & { titleIcon?: JSX.Element }
) => {
  return (
    <RDialog.Title
      asChild
      className={cx("t-mb-0 t-text-h5", props.className || "")}
      {...props}
    >
      <span className="t-flex t-justify-between">
        {props?.children}
        {props?.titleIcon}
      </span>
    </RDialog.Title>
  );
};

const Subtitle = (props: RDialog.DialogDescriptionProps) => {
  return (
    <RDialog.Description
      {...props}
      className={cx(
        "t-mb-0 t-mt-1 t-text-subtext-sm t-text-neutral-30",
        props.className || ""
      )}
    />
  );
};

const Close = (props: RDialog.DialogCloseProps) => (
  <RDialog.Close {...props} asChild>
    <Button customType="ghost_icon" size="small" title="Close Modal">
      X
    </Button>
  </RDialog.Close>
);

const Body = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cx("t-overflow-auto t-px-8 t-py-5", props.className || "")}
    />
  );
};

const Footer = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cx(
        "t-flex-shrink-0 t-px-6 t-py-4 t-border-0 t-border-t t-border-solid t-border-t-neutral-0",
        props.className || ""
      )}
    />
  );
};

const Content = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      useCustomOverlay = false,
      size = "regular",
      className = "",
      ...rest
    }: ModalProps,
    forwardedRef
  ) => {
    return (
      <RDialog.Portal>
        {useCustomOverlay ? <CustomOverlay /> : <Overlay />}
        <RDialog.Content
          {...rest}
          className={cx(
            "t-fixed t-left-1/2 t-top-1/2 t-z-modal t-flex -t-translate-x-1/2 -t-translate-y-1/2 t-flex-col t-bg-white ",
            ModalSize[size],
            className,
            {
              "t-rounded-lg t-max-h-[80vh] t-max-w-[90vw] t-container":
                size !== "fullscreen",
            }
          )}
          ref={forwardedRef}
        >
          {children}
        </RDialog.Content>
      </RDialog.Portal>
    );
  }
);

const CustomOverlay = (
  props: RDialog.DialogOverlayProps & React.RefAttributes<HTMLDivElement>
) => {
  useEffect(() => {
    document.body.classList.add("pointer-events-none");
    return () => {
      document.body.classList.remove("pointer-events-none");
    };
  }, []);

  return (
    <div
      className={cx(
        "t-fixed t-inset-0 t-z-modal t-bg-text-100 t-opacity-20",
        props.className || ""
      )}
    />
  );
};

const FooterButtonGroup = ({ children }: { children: ReactNode }) => (
  <Footer>
    <div className="t-flex t-gap-2 t-items-center t-justify-end">
      {children}
    </div>
  </Footer>
);

const Overlay = forwardRef(
  ({
    ...props
  }: RDialog.DialogOverlayProps & React.RefAttributes<HTMLDivElement>) => (
    <RDialog.Overlay
      {...props}
      className={cx(
        "t-fixed t-inset-0 t-z-modal t-bg-text-100 t-opacity-20",
        props.className || ""
      )}
    />
  )
);

const FormikRoot = <T extends FormikValues>(
  props: FormikConfig<T> & Omit<RDialog.DialogProps, "children">
) => {
  const {
    open,
    onOpenChange,
    defaultOpen,
    modal,
    children,
    initialValues,
    ...rest
  } = props;

  if (!open) {
    return null;
  }

  return (
    <Formik {...rest} initialValues={initialValues}>
      {(state) => (
        <Form>
          <Modal.Root
            open={open}
            onOpenChange={onOpenChange}
            defaultOpen={defaultOpen}
            modal={modal}
          >
            {typeof children === "function" ? children(state) : children}
          </Modal.Root>
        </Form>
      )}
    </Formik>
  );
};

const Modal = {
  ...RDialog,
  Header,
  Title,
  Subtitle,
  Close,
  Body,
  Footer,
  FooterButtonGroup,
  Content,
  RawContent: RDialog.Content,
  RawClose: RDialog.Close,
  Overlay,
  FormikRoot,
};

export default Modal;
