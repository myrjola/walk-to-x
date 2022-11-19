import React, { type HTMLProps } from "react";
import classNames from "classnames";
import * as RadixLabel from "@radix-ui/react-label";

const Input = React.forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input className={classNames("rounded", className)} ref={ref} {...props} />
  )
);
Input.displayName = "Input";

function Label({ className, ...rest }: RadixLabel.LabelProps) {
  return (
    <RadixLabel.Root className={classNames("mr-2", className)} {...rest} />
  );
}

const Error = React.forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ className, ...rest }, ref) => (
    <div
      role="alert"
      className={classNames("text-red-400", className)}
      ref={ref}
      {...rest}
    />
  )
);
Error.displayName = "Error";

export { Input, Label, Error };
