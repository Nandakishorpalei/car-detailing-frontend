import React, { HTMLAttributes, ReactNode } from "react";
import cx from "classnames";
import { Field, FieldProps } from "formik";
import classNames from "classnames";
import ConditionalToolTip from "../../UI-Utils/ConditionalTooltip";
import { ToolTipIcon } from "../../Icons/TooltipIcon";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  customSize?: "regular" | "large" | "small";
  customType?: "error" | "success" | "warning";
  block?: boolean;
  name?: string;
  tooltipText?: string;
  icon?: ReactNode;
  customPrefix?: ReactNode;
  rightComponent?: ReactNode;
  isDateInput?: boolean;
}

export const ErrorMessage = ({ children }: { children: ReactNode }) => (
  <div className="mt-1.5 text-caption leading-none text-red">{children}</div>
);

const INPUT_CLASSNAMES = (
  customSize: InputProps["customSize"],
  customType: InputProps["customType"]
) =>
  cx(
    "w-full flex w-full items-center rounded justify-between border border-solid bg-surface-lighter-grey px-3 text-body font-medium text-text-100 transition-all  focus:bg-surface-transparent focus:outline-none disabled:cursor-no-drop disabled:text-neutral-30",
    {
      "h-12": customSize === "regular",
      "h-8": customSize === "small",
      "border-red focus:border-red": customType === "error",
      "border-yellow focus:border-yellow": customType === "warning",
      "border-neutral-10 focus:border-blue": customType !== "error",
    }
  );

export const BareInput = ({
  type = "text",
  customSize = "regular",
  label,
  customType,
  block,
  tooltipText,
  className,
  ...props
}: InputProps) => (
  <>
    <input
      type={type}
      className={INPUT_CLASSNAMES(customSize, customType)}
      {...props}
    />
  </>
);

export const Label = ({
  htmlFor,
  ...props
}: HTMLAttributes<HTMLLabelElement> & { htmlFor?: string }) => (
  <label
    className="font-sans text-caption text-neutral-80"
    htmlFor={htmlFor}
    {...props}
  />
);

export function Input(inputProps: InputProps) {
  const {
    type = "text",
    label,
    tooltipText,
    customType,
    customPrefix,
    icon,
    rightComponent,
    isDateInput,
    required = false,
    ...props
  } = inputProps;

  if (customPrefix || icon || rightComponent) {
    return <TextInputWithPrefix {...inputProps} />;
  }

  return (
    <Field type={type} name={props.name} className="w-full" {...props}>
      {({ field, form: { touched, errors, validateOnChange } }: FieldProps) => {
        let hasError = touched[field.name] && errors[field.name];

        if (validateOnChange) {
          hasError = errors[field.name];
        }

        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          field.onChange(e);

          if (isDateInput && !isNaN(new Date(value).valueOf())) {
            props.onChange?.(e);
          }
        };

        return (
          <span className="relative block w-full">
            {(label || tooltipText) && (
              <div className="flex items-center ">
                <div className="flex items-center justify-center pb-1.5">
                  {label && (
                    <label
                      className={classNames(
                        "font-sans text-caption text-neutral-80",
                        {
                          "after:font-bold after:text-red after:content-['_*']":
                            required,
                        }
                      )}
                    >
                      {label}
                    </label>
                  )}
                  {tooltipText && (
                    <div className="ml-1">
                      <ConditionalToolTip condition={tooltipText}>
                        <span>
                          <ToolTipIcon />
                        </span>
                      </ConditionalToolTip>
                    </div>
                  )}
                </div>
              </div>
            )}

            <BareInput
              {...{ ...field, ...props }}
              onChange={onChange}
              type={type}
              customType={hasError ? "error" : customType}
            />

            {hasError && (
              <ErrorMessage>
                {/* @ts-ignore */}
                {errors[field.name]}
              </ErrorMessage>
            )}
          </span>
        );
      }}
    </Field>
  );
}

export function TextInputWithPrefix({
  type = "text",
  customSize = "regular",
  label,
  customType,
  block,
  tooltipText,
  className,
  customPrefix,
  icon,
  rightComponent,
  ...props
}: { customPrefix?: ReactNode; icon?: ReactNode } & InputProps) {
  return (
    <div className="relative w-full">
      <div className="flex items-center">
        {(label || tooltipText) && (
          <div className="flex items-center justify-center pb-1.5">
            {label && (
              <label className="font-sans text-caption text-neutral-80">
                {label}
              </label>
            )}
            {tooltipText && (
              <div className="ml-1">
                <ConditionalToolTip condition={tooltipText}>
                  <span>
                    <ToolTipIcon />
                  </span>
                </ConditionalToolTip>
              </div>
            )}
          </div>
        )}
      </div>

      <Field type={type} name={props.name} className="w-full" {...props}>
        {({
          field,
          form: { touched, errors, validateOnChange },
        }: FieldProps) => {
          let hasError = touched[field.name] && errors[field.name];

          if (validateOnChange) {
            hasError = errors[field.name];
          }

          const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            field.onChange(e);
            props.onChange?.(e);
          };

          return (
            <>
              <div
                className={INPUT_CLASSNAMES(
                  customSize,
                  hasError ? "error" : customType
                )}
              >
                {customPrefix}
                {customPrefix && (
                  <div className="h-full px-4 py-2">
                    <div className="h-full border-[0.5px] border-solid border-neutral-20" />
                  </div>
                )}
                <input
                  type={type}
                  className={cx("all:unset", {
                    "h-12": customSize === "regular",
                    "h-8": customSize === "small",
                    "w-3/4": icon || rightComponent,
                    "w-full": !icon && !rightComponent,
                  })}
                  {...{ ...field, ...props }}
                  onChange={onChange}
                />
                {icon && (
                  <div className="flex h-full items-center justify-center">
                    {icon}
                  </div>
                )}
                {rightComponent && rightComponent}
              </div>

              {hasError && (
                <ErrorMessage>
                  {/* @ts-ignore */}
                  {errors[field.name]}
                </ErrorMessage>
              )}
            </>
          );
        }}
      </Field>
    </div>
  );
}
