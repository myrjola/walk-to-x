import React from "react";
import classNames from "classnames";

export const Table = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    className={classNames(
      "relative mx-auto max-w-md overflow-x-auto bg-white shadow-md sm:rounded-lg",
      className
    )}
    ref={ref}
    {...props}
  >
    <table className="w-full text-left text-sm text-gray-500">{children}</table>
  </div>
));
Table.displayName = "Table";

export const Header = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLProps<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <thead
    className={classNames(
      "bg-gray-100 text-xs uppercase text-gray-700",
      className
    )}
    ref={ref}
    {...props}
  >
    <tr>{children}</tr>
  </thead>
));
Header.displayName = "Header";

export const Row = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLProps<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    className={classNames("px-4 py-2 text-left", className)}
    ref={ref}
    {...props}
  />
));
Row.displayName = "Row";

export const ColumnHeaderCell = React.forwardRef<
  HTMLTableHeaderCellElement,
  React.HTMLProps<HTMLTableHeaderCellElement>
>(({ className, ...props }, ref) => (
  <th
    scope="col"
    className={classNames("py-3 px-6", className)}
    ref={ref}
    {...props}
  />
));
ColumnHeaderCell.displayName = "ColumnHeaderCell";

export const RowHeaderCell = React.forwardRef<
  HTMLTableHeaderCellElement,
  React.HTMLProps<HTMLTableHeaderCellElement>
>(({ className, ...props }, ref) => (
  <th
    scope="row"
    className={classNames(
      "whitespace-nowrap py-4 px-6 font-medium text-gray-900",
      className
    )}
    ref={ref}
    {...props}
  />
));
RowHeaderCell.displayName = "RowHeaderCell";

export const Cell = React.forwardRef<
  HTMLTableDataCellElement,
  React.HTMLProps<HTMLTableDataCellElement>
>(({ className, ...props }, ref) => (
  <td className={classNames("py-4 px-6", className)} ref={ref} {...props} />
));
Cell.displayName = "Cell";
