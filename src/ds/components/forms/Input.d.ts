import * as React from "react";

/** Single-line text field, 48px tall with a 12px radius. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /** replaces hint and turns the border clay red */
  error?: React.ReactNode;
  icon?: React.ReactNode;
  /** static text before the value, e.g. "$" */
  prefix?: React.ReactNode;
  /** static text after the value, e.g. "COP" */
  suffix?: React.ReactNode;
  wrapperStyle?: React.CSSProperties;
}
export declare function Input(props: InputProps): JSX.Element;
