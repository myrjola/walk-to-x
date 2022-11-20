import React, { type HTMLProps } from "react";
import classNames from "classnames";
import * as RadixLabel from "@radix-ui/react-label";
import { FieldError } from "react-hook-form";

const Input = React.forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      className={classNames(
        "relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm",
        {
          "border-pink-500 focus:border-pink-500 focus:outline-none focus:ring-pink-500":
            props["aria-invalid"],
        },
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

function Label({ className, ...rest }: RadixLabel.LabelProps) {
  return (
    <RadixLabel.Root
      className={classNames("block text-gray-500 text-sm mb-1", className)}
      {...rest}
    />
  );
}

interface ErrorProps extends Omit<HTMLProps<HTMLDivElement>, "children"> {
  error?: FieldError;
}

const Error = React.forwardRef<HTMLDivElement, ErrorProps>(
  ({ error, className, ...rest }, ref) => (
    <div
      role="alert"
      className={classNames("text-sm text-pink-500 mt-1", className)}
      ref={ref}
      {...rest}
    >
      {error && error.message}
      <span aria-hidden className="invisible">
        Inflates the box
      </span>
    </div>
  )
);
Error.displayName = "Error";

const Select = React.forwardRef<
  HTMLSelectElement,
  HTMLProps<HTMLSelectElement>
>(({ className, ...rest }, ref) => (
  <select className={classNames("", className)} ref={ref} {...rest} />
));
Select.displayName = "Select";

export { Input, Label, Error, Select };
