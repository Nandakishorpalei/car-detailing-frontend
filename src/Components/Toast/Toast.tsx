import * as ToastPrimitive from "@radix-ui/react-toast";
import classNames from "classnames";
import { Cross } from "../../Icons/Cross"
import { Error } from "../../Icons/Error";
import { InfoFilled } from "../../Icons/InfoFilled";
import { LoadingIcon } from "../../Icons/LoadingIcon";
import { SolidCheck } from "../../Icons/SolidCheck";
import { Warning } from "../../Icons/Warning";
import { Children, cloneElement, ReactNode } from "react";
import { Button } from "../../UI-Components/Button/Button";

const TOAST_ROOT_TYPE_CLASSES = {
  /* @tw */
  DEFAULT: "border-blue bg-blue-10",
  /* @tw */
  SUCCESS: "border-green bg-green-10",
  /* @tw */
  WARNING: "border-yellow bg-yellow-10",
  /* @tw */
  ERROR: "border-red bg-red-10",
};

const TOAST_TYPE_ICONS = {
  default: <InfoFilled />,
  success: <SolidCheck />,
  warning: <Warning />,
  error: <Error />,
  loading: (
    <span className="flex origin-center animate-spin">
      <LoadingIcon />
    </span>
  ),
};

export type ToastCustomType =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "loading";
export type ToastSizeType = "small" | "regular" | "large";

type RootProps = {
  customType?: ToastCustomType;
  children: ReactNode;
  icon?: boolean;
  size?: ToastSizeType;
} & ToastPrimitive.ToastProps;

type ActionProps = {
  onAction: () => void;
  children: ReactNode;
  size?: ToastSizeType;
} & ToastPrimitive.ToastActionProps;

const Title = (props: ToastPrimitive.ToastTitleProps) => {
  return (
    <ToastPrimitive.Title
      {...props}
      className="all:unset text-subtitle-sm group-data-[type=default]:text-blue-100 group-data-[type=loading]:text-blue-100 group-data-[type=error]:text-red-100 group-data-[type=warning]:text-yellow-100 group-data-[type=success]:text-green-100"
    />
  );
};

const Description = (props: ToastPrimitive.ToastDescriptionProps) => {
  return (
    <ToastPrimitive.Description
      {...props}
      className="text-body-sm text-text-60"
    />
  );
};

const Viewport = (props: ToastPrimitive.ToastViewportProps) => {
  return <ToastPrimitive.Viewport {...props} className="list-none" />;
};

const Root = ({
  customType = "error",
  size = "small",
  icon = true,
  children,
  ...props
}: RootProps) => {
  const Close = Children.toArray(children).filter(
    ({ type: { name } }: any) => name === "Close"
  )?.[0];

  const Description =
    size !== "small"
      ? Children.toArray(children).filter(
          ({ type: { name } }: any) => name === "Description"
        )?.[0]
      : [];

  const Action = Children.toArray(children).filter(
    ({ type: { name } }: any) => name === "Action"
  )?.[0];

  const Title = Children.toArray(children).filter(
    ({ type: { name } }: any) => name === "Title"
  )?.[0];

  //@ts-ignore
  const ModifiedAction = Action && cloneElement(Action, { size });

  const Components = {
    Title: Children.map(Title, (child) => child),
    Description: Children.map(Description, (child) => child),
    Action: Children.map(ModifiedAction, (child) => child),
    Close: Children.map(Close, (child) => child),
  };

  return (
    <ToastPrimitive.Root
      onClick={(e) => {
        e.stopPropagation();
      }}
      data-type={customType}
      {...props}
      className={classNames(
        "all:unset group mr-8 flex min-w-[17.5rem] max-w-[20.5rem] items-center justify-between gap-2 rounded border-[0.5px] border-solid text-subtitle-sm py-2",
        {
          [TOAST_ROOT_TYPE_CLASSES.DEFAULT]:
            customType === "default" || customType === "loading",
          [TOAST_ROOT_TYPE_CLASSES.SUCCESS]: customType === "success",
          [TOAST_ROOT_TYPE_CLASSES.WARNING]: customType === "warning",
          [TOAST_ROOT_TYPE_CLASSES.ERROR]: customType === "error",
          "px-3": size === "small",
          "px-4": size !== "small",
        }
      )}
    >
      <div className="flex w-full items-center gap-2">
        {icon && (
          <div
            className={classNames({
              "self-center": size === "small",
              "self-start": size === "large" || size === "regular",
            })}
          >
            {TOAST_TYPE_ICONS[customType]}
          </div>
        )}
        <div
          className={classNames("flex w-full justify-between gap-2", {
            "flex-row items-center ":
              size === "small" || size === "regular",
            "flex-col": size === "large",
          })}
        >
          <div className="flex flex-col gap-1">
            {Components.Title}
            {Components.Description}
          </div>
          <div
            className={classNames("self-start", {
              "mr-auto": size === "large",
            })}
          >
            {Components.Action}
          </div>
        </div>
      </div>

      <div className="self-start">{Components.Close}</div>
    </ToastPrimitive.Root>
  );
};

const Close = ({ onClose }: { onClose: (v: boolean) => void }) => {
  return (
    <ToastPrimitive.Close asChild>
      <Button size="small" customType="ghost" onClick={() => onClose(false)}>
        <Cross />
      </Button>
    </ToastPrimitive.Close>
  );
};

const Action = ({ onAction, children, ...props }: ActionProps) => {
  const { size } = props;
  const buttonType = size === "large" ? "secondary" : "ghost";

  return (
    <ToastPrimitive.Action {...props} asChild>
      <Button size="small" customType={buttonType} onClick={onAction}>
        {children}
      </Button>
    </ToastPrimitive.Action>
  );
};

const Provider = ({
  duration = 3000,
  children,
  ...props
}: ToastPrimitive.ToastProviderProps) => {
  return (
    <ToastPrimitive.Provider {...props} duration={duration}>
      {children}
      <Toast.Viewport />
    </ToastPrimitive.Provider>
  );
};

const Toast = {
  ...ToastPrimitive,
  Title: Title,
  Viewport: Viewport,
  Root: Root,
  Close: Close,
  Description: Description,
  Action: Action,
  Provider: Provider,
};

export default Toast;
