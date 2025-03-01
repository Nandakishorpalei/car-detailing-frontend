import { useState } from "react";
import { Field } from "formik";
import { Combobox as HeadlessCombobox } from "@headlessui/react";
import classNames from "classnames";

type Option = {
  label: string;
  value: string;
};

type ComboboxProps = {
  label?: string;
  block?: boolean;
  options: Option[]; // List of options with label & value
  onChange?: (value: string) => void;
  required?: boolean;
  name: string;
};

export const Combobox = ({
  label,
  options,
  onChange,
  ...props
}: ComboboxProps) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className={classNames("relative", { "block w-full": props.block })}>
      {label && (
        <p
          className={classNames("mb-1.5 text-caption text-neutral-80", {
            "after:font-bold after:text-red after:content-['_*']":
              props?.required,
          })}
        >
          {label}
        </p>
      )}

      <Field name={props.name}>
        {({ field, form }: { field: any; form: any }) => {
          const hasError = form.touched[field.name] && form.errors[field.name];
          return (
            <HeadlessCombobox
              value={selected}
              onChange={(selectedOption) => {
                //@ts-ignore
                const newValue = selectedOption?.value || selectedOption;
                setSelected(newValue);
                form.setFieldValue(field.name, newValue);
                onChange?.(newValue || "");
              }}
            >
              <div className="relative">
                <HeadlessCombobox.Input
                  className={classNames(
                    "w-full h-10 px-3 text-body font-medium text-text-100 transition-all border border-solid bg-surface-lighter-grey rounded focus:bg-surface-transparent focus:outline-none focus:border-blue",
                    {
                      "border-red focus:border-red": hasError,
                      "border-neutral-10": !hasError,
                    }
                  )}
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  placeholder="Type or select an option"
                />
                <HeadlessCombobox.Options className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg">
                  {filteredOptions.length > 0 &&
                    filteredOptions.map((option) => (
                      <HeadlessCombobox.Option
                        key={option.value}
                        value={option}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        {option.label}
                      </HeadlessCombobox.Option>
                    ))}

                  {filteredOptions.length == 0 && query && (
                    <div
                      className="p-2 text-gray-500 cursor-pointer"
                      onClick={() => {
                        setSelected(query);
                        form.setFieldValue(field.name, query);
                        onChange?.(query);
                      }}
                    >
                      Create "{query}"
                    </div>
                  )}
                </HeadlessCombobox.Options>
              </div>
            </HeadlessCombobox>
          );
        }}
      </Field>
    </div>
  );
};
