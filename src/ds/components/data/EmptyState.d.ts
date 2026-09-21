import * as React from "react";

/** Shown when a screen has no data yet, or when the data could not be loaded. */
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  body?: React.ReactNode;
  action?: React.ReactNode;
  /** error = clay fill and solid border, announced as role="alert" */
  tone?: "sunken" | "plain" | "error";
}
export declare function EmptyState(props: EmptyStateProps): JSX.Element;
