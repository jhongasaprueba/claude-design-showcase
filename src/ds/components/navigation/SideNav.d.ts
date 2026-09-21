import * as React from "react";

/** Desktop left rail: brand mark, destinations, footer slot. */
export interface SideNavItem { value: string; label: string; icon?: React.ReactNode; badge?: number | string }
export interface SideNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: SideNavItem[];
  value?: string;
  onChange?: (value: string) => void;
  /** brand block at the top — wordmark, never an invented logo */
  brand?: React.ReactNode;
  footer?: React.ReactNode;
}
export declare function SideNav(props: SideNavProps): JSX.Element;
