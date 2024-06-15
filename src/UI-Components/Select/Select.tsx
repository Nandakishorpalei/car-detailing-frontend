import classNames from "classnames";
import { Field } from "formik";
import { InputHTMLAttributes } from "react";
import { ArrowDown } from "../../Icons/ArrowDown";

type SelectDropDownI = {
  label?: string;
  block?: boolean;
} & InputHTMLAttributes<HTMLSelectElement>;

export function SelectDropDown({ label, ...props }: SelectDropDownI) {
  return (
    <div className={classNames("relative", { "block w-full": props.block })}>
      <p
        className={classNames("mb-1.5 text-caption text-neutral-80", {
          "after:font-bold after:text-red after:content-['_*']":
            props?.required,
        })}
      >
        {label}
      </p>
      <Field {...props}>
        {({
          field,
          form: { touched, errors },
        }: {
          field: any;
          form: { touched: any; errors: any };
        }) => {
          const hasError = touched[field.name] && errors[field.name];
          const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            field.onChange(e);
            props.onChange?.(e);
          };

          return (
            <>
              <select
                className={`all:unset form-input w-full box-border  flex h-[48px] w-[100%] items-center justify-center rounded border border-solid font-sans disabled:cursor-not-allowed disabled:text-neutral-30 focus:bg-surface-transparent focus:outline-none focus:border-blue ${
                  hasError ? "border-red " : "border-neutral-10 "
                } border-neutral-10 bg-surface-lighter-grey px-4 pr-5 text-body !font-medium text-text-100 transition-all`}
                {...{ ...field, ...props }}
                onChange={onChange}
              />
              {touched[field.name] && errors[field.name] && (
                <div className="absolute mt-1.5 text-caption text-red">
                  {errors[field.name]}
                </div>
              )}
            </>
          );
        }}
      </Field>
    </div>
  );
}
