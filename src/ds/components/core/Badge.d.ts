import * as React from "react";

/** Small status pill: deltas, payment states, risk flags. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  tone?: "neutral" | "positive" | "negative" | "warning" | "brand" | "accent";
  icon?: React.ReactNode;
  /** leading 6px dot in the current colour */
  dot?: boolean;
}
export declare function Badge(props: BadgeProps): JSX.Element;
