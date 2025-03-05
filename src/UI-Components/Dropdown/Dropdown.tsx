import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import cx from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { ComponentProps, ReactNode, Ref, forwardRef, useId } from "react";
import classNames from "classnames";
import { ArrowRight } from "../../Icons/ArrowRight";
import { Checkbox } from "../Checkbox/Checkbox";

type ContentProps = {
  className?: string;
};

type ItemProps = {
  icon?: ReactNode;
  tag?: ReactNode;
  type?: "danger" | "ordinary";
};

export type DropdownItemProps = DropdownMenu.DropdownMenuItemProps &
  React.RefAttributes<HTMLDivElement> &
  ContentProps &
  ItemProps;

const Label = ({
  className = "",
  disabled,
  ...props
}: DropdownMenu.DropdownMenuLabelProps &
  React.RefAttributes<HTMLDivElement> &
  ContentProps & { disabled?: boolean }) => (
  <DropdownMenu.Label
    {...props}
    className={cx(
      "group w-full truncate !border-none px-3 py-2 font-medium text-subtext-sm",
      {
        [className]: className,
        "text-text-30": !disabled,
        "text-neutral-40": disabled,
      }
    )}
  />
);

const BaseItem = forwardRef(
  (
    {
      className = "",
      tag,
      icon,
      type,
      ...props
    }: ComponentProps<"div"> & ItemProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={cx(
          "group w-full cursor-pointer truncate !border-none px-3 py-2 hover:bg-surface-grey focus-visible:outline-none data-[disabled]:cursor-not-allowed data-[disabled]:text-neutral-30 data-[disabled]:hover:bg-surface-transparent data-[highlighted]:bg-surface-lighter-grey flex gap-1.5 items-center group-data-state-open:text-purple rounded",
          {
            [className]: className,
            "text-red": type === "danger",
            "hover:text-text-100 ": type === "ordinary",
          }
        )}
        {...props}
      >
        {icon && <span className="flex text-text-30">{icon}</span>}
        {props.children}
        <div className="ml-auto">{tag}</div>
      </div>
    );
  }
);

const Item = ({
  icon,
  tag,
  children,
  type = "ordinary",
  ...props
}: DropdownItemProps) => {
  return (
    <DropdownMenu.Item asChild {...props}>
      <BaseItem type={type} icon={icon} tag={tag}>
        {children}
      </BaseItem>
    </DropdownMenu.Item>
  );
};

const SubTrigger = ({
  className = "",
  icon,
  children,
  ...props
}: DropdownMenu.DropdownMenuSubTriggerProps &
  React.RefAttributes<HTMLDivElement> &
  ContentProps & { icon?: ReactNode }) => {
  return (
    <DropdownMenu.SubTrigger {...props}>
      <div className="group outline-none">
        <BaseItem icon={icon} tag={<ArrowRight />}>
          {children}
        </BaseItem>
      </div>
    </DropdownMenu.SubTrigger>
  );
};

const CheckboxItem = ({
  children,
  ...props
}: DropdownMenu.DropdownMenuCheckboxItemProps) => {
  const id = useId();

  return (
    <DropdownMenu.CheckboxItem
      asChild
      {...props}
      onSelect={(e) => e.preventDefault()}
    >
      <div className="outline-none">
        <label htmlFor={id} className="w-full">
          <BaseItem
            icon={
              <Checkbox
                id={id}
                checked={
                  typeof props.checked === "boolean" ? props.checked : undefined
                }
                indeterminate={props.checked === "indeterminate"}
                onChange={() => props.onCheckedChange?.(!props.checked)}
                name={id}
              />
            }
          >
            {children}
          </BaseItem>
        </label>
      </div>
    </DropdownMenu.CheckboxItem>
  );
};

const Separator = () => (
  <DropdownMenu.Separator asChild>
    <div className="my-2 mx-3 border-t border-0 border-solid border-neutral-20" />
  </DropdownMenu.Separator>
);

const Content = ({
  className = "",
  children,
  ...props
}: DropdownMenu.DropdownMenuContentProps &
  React.RefAttributes<HTMLDivElement> &
  ContentProps) => {
  return (
    <DropdownMenu.Content {...props} asChild>
      <motion.div
        className={cx(
          "z-dropdown relative border-solid min-w-56 border border-neutral-10 shadow-light-100 rounded-md bg-surface text-body overflow-auto p-1",
          {
            [className]: className,
          }
        )}
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        exit={{ y: -10 }}
      >
        {children}
      </motion.div>
    </DropdownMenu.Content>
  );
};

const Portal = (props: DropdownMenu.DropdownMenuPortalProps) => (
  //@ts-ignore
  <AnimatePresence>
    <DropdownMenu.Portal {...props} />
  </AnimatePresence>
);

const SubContent = ({
  className = "",
  children,
  ...props
}: DropdownMenu.DropdownMenuSubContentProps &
  React.RefAttributes<HTMLDivElement> &
  ContentProps) => {
  return (
    <DropdownMenu.SubContent {...props} asChild>
      <motion.div
        className={cx(
          "z-dropdown border-solid border border-neutral-10 shadow-light-100 rounded-md bg-surface text-body overflow-auto min-w-56 p-1",
          {
            [className]: className,
          }
        )}
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        exit={{ y: -10 }}
      >
        {children}
      </motion.div>
    </DropdownMenu.SubContent>
  );
};

const FooterButtonGroup = ({
  children,
  direction = "horizontal",
}: {
  children: ReactNode;
  direction?: "horizontal" | "vertical";
}) => (
  <div
    className={classNames("flex gap-2 items-center py-2 px-3 w-full", {
      "flex-col": direction === "vertical",
    })}
  >
    {children}
  </div>
);

const Dropdown = {
  ...DropdownMenu,
  Portal: Portal,
  Item: Item,
  Content: Content,
  Label,
  SubContent,
  Separator,
  SubTrigger,
  CheckboxItem,
  FooterButtonGroup,
  BaseItem,
};

export default Dropdown;
