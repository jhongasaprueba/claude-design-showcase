import * as React from "react";

/** Breadcrumb + 36px title (+ optional record count) + right-aligned actions. */
export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  title?: React.ReactNode;
  /** rendered as a muted "(948)" beside the title */
  count?: number | string;
  breadcrumb?: React.ReactNode;
  actions?: React.ReactNode;
  /** small line under the title, e.g. "Actualizado hace 2 min" */
  meta?: React.ReactNode;
}
export declare function PageHeader(props: PageHeaderProps): JSX.Element;
