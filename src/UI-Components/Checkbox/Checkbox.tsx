import {
  forwardRef,
  InputHTMLAttributes,
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
} from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string | ReactNode;
  disabled?: boolean;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement | null, CheckboxProps>(
  ({ name, label, disabled = false, indeterminate = false, ...props }, ref) => {
    const loacalref = useRef<HTMLInputElement>(null);
    const finalRef =
      (ref as MutableRefObject<HTMLInputElement | null>) || loacalref;

    useEffect(() => {
      if (finalRef.current !== null) {
        finalRef.current.indeterminate = indeterminate;
      }
    }, [finalRef, indeterminate]);

    return (
      <div className="relative flex flex-shrink-0 flex-grow-0 items-center justify-start gap-2">
        <input
          className="form-checkbox left-0 top-0 h-4 w-4 cursor-pointer rounded-sm border-solid border-neutral-20 text-blue opacity-100 indeterminate:border-blue indeterminate:text-blue hover:bg-surface-blue focus:text-blue focus:ring-blue-20 focus:ring-offset-0 disabled:pointer-events-none disabled:border-neutral-10 disabled:!text-surface-grey"
          disabled={disabled}
          type="checkbox"
          name={name}
          id={name}
          ref={finalRef}
          {...props}
        />
        {label && (
          <label
            className="cursor-pointer select-none texbody text-neutral-100"
            htmlFor={name}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
