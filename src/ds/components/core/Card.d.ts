import * as React from "react";

/**
 * The panel's only container. White, 20px radius, hairline border, green-tinted shadow.
 */
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  /** small muted label in the card header */
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** right-aligned header controls, usually IconButtons */
  actions?: React.ReactNode;
  tone?: "default" | "sunken" | "inverse" | "ink" | "accent";
  padding?: "none" | "sm" | "md" | "lg";
  /** soft lime radial bloom behind the top of the card */
  bloom?: boolean;
  interactive?: boolean;
}
export declare function Card(props: CardProps): JSX.Element;
