import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import cx from "classnames";
import { Field, FieldProps, useFormikContext } from "formik";
import { ErrorMessage } from "../Input/Input";

interface PhoneInputProps {
  name: string;
  label?: string;
  tooltipText?: string;
  customType?: "error" | "success" | "warning";
  required?: boolean;
}

export const PhoneNumberInput = ({
  name,
  label,
  tooltipText,
  customType,
  required = false,
}: PhoneInputProps) => {
  const PHONE_INPUT_CLASSNAMES = cx(
    "w-full flex items-center rounded border border-solid bg-surface-lighter-grey px-3 text-body font-medium text-text-100 transition-all focus:bg-surface-transparent focus:outline-none disabled:cursor-no-drop disabled:text-neutral-30",
    {
      "h-12": true, // Default height (matches `customSize === "regular"`),
      "border-red focus:border-red": customType === "error",
      "border-yellow focus:border-yellow": customType === "warning",
      "border-neutral-10 focus:border-blue": customType !== "error",
    }
  );

  const { setFieldValue } = useFormikContext();

  return (
    <Field name={name}>
      {({ field, form: { touched, errors } }: FieldProps) => {
        const hasError = touched[field.name] && errors[field.name];
        return (
          <div className="relative w-full">
            {label && (
              <div className="flex items-center justify-between pb-1.5">
                {label && (
                  <label
                    className={cx("font-sans text-caption text-neutral-80", {
                      "after:font-bold after:text-red after:content-['_*']":
                        required,
                    })}
                  >
                    {label}
                  </label>
                )}
                {tooltipText && (
                  <span className="ml-1 text-neutral-60">{tooltipText}</span>
                )}
              </div>
            )}
            <PhoneInput
              country={"in"}
              inputProps={{
                name: field.name,
                required,
              }}
              value={field.value}
              onChange={(phone) => {
                setFieldValue(field.name, phone);
              }}
              inputClass={PHONE_INPUT_CLASSNAMES}
              buttonClass="border-neutral-10 border-r-2 pr-2"
              inputStyle={{ width: "100%" }}
              disableDropdown
            />
            {hasError && (
              <ErrorMessage>
                {/* @ts-ignore */}
                {errors[field.name]}
              </ErrorMessage>
            )}
          </div>
        );
      }}
    </Field>
  );
};
