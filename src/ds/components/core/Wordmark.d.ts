import * as React from "react";

/** The brand mark: the product name in type. There is no logo file — see readme.md. */
export interface WordmarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** font size in px; 18 in app chrome, 34+ on login */
  size?: number;
  tone?: "ink" | "brand" | "cream";
  /** small uppercase line beneath, e.g. "PANEL PRIVADO" */
  subtitle?: React.ReactNode;
}
export declare function Wordmark(props: WordmarkProps): JSX.Element;
