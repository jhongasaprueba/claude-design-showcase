import * as React from "react";

/**
 * Pill switcher for periods and views (Semana / Mes / Trimestre / Año).
 */
export interface SegmentedTabItem { value: string; label: string }
export interface SegmentedTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: Array<string | SegmentedTabItem>;
  value?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md" | "lg";
  /** sunken = cream track, ink = black track with cream thumb, plain = white track */
  tone?: "sunken" | "ink" | "plain";
}
export declare function SegmentedTabs(props: SegmentedTabsProps): JSX.Element;
