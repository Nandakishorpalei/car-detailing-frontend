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
          className="left-0 top-0 h-4 w-4 cursor-pointer rounded-sm border-solid border-neutral-10 text-green opacity-100 indeterminate:border-green indeterminate:text-green hover:bg-surface-background focus:text-green focus:ring-green-20 focus:ring-offset-0 disabled:pointer-events-none disabled:border-neutral-10 disabled:!text-surface-grey"
          disabled={disabled}
          type="checkbox"
          name={name}
          id={name}
          ref={finalRef}
          {...props}
        />
        {label && (
          <label
            className="cursor-pointer select-none text-body text-text-30"
            htmlFor={name}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
