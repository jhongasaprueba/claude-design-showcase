import * as React from "react";

/** Native select with the house chevron. */
export interface SelectOption { value: string; label: string }
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /** strings or {value,label} pairs */
  options?: Array<string | SelectOption>;
  wrapperStyle?: React.CSSProperties;
}
export declare function Select(props: SelectProps): JSX.Element;
