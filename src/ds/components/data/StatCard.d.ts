import * as React from "react";

/**
 * Label + big figure + delta badge. The dashboard is a grid of these.
 */
export interface StatCardProps extends React.HTMLAttributes<HTMLElement> {
  label?: React.ReactNode;
  value: number | string;
  currency?: string;
  role?: "cash" | "receivable" | "payable" | "profit" | "neutral";
  /** e.g. "+12,5%" — tone is inferred from the sign unless deltaTone is set */
  delta?: React.ReactNode;
  deltaTone?: "positive" | "negative" | "warning" | "neutral";
  caption?: React.ReactNode;
  icon?: React.ReactNode;
  /** slot under the figure, e.g. <BarSparkline /> */
  chart?: React.ReactNode;
  tone?: "default" | "sunken" | "inverse" | "ink" | "accent";
  size?: "sm" | "md" | "lg";
  actions?: React.ReactNode;
}
export declare function StatCard(props: StatCardProps): JSX.Element;
