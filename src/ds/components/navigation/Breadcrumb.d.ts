import * as React from "react";

/** Slash-separated trail above a page title. */
export interface BreadcrumbItem { label: string; icon?: React.ReactNode }
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items?: Array<string | BreadcrumbItem>;
}
export declare function Breadcrumb(props: BreadcrumbProps): JSX.Element;
