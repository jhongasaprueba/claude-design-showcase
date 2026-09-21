import * as React from "react";

/** Avatar + name + secondary line, for the first column of a table. */
export interface ContactCellProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  /** second line: city, invoice number, due date */
  note?: React.ReactNode;
  tone?: "brand" | "accent" | "neutral";
  size?: "xs" | "sm" | "md";
}
export declare function ContactCell(props: ContactCellProps): JSX.Element;
