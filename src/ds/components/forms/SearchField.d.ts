import * as React from "react";

/** Pill-shaped search input for toolbars and table headers. */
export interface SearchFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  icon?: React.ReactNode;
  width?: string | number;
}
export declare function SearchField(props: SearchFieldProps): JSX.Element;
