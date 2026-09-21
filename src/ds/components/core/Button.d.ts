import * as React from "react";

/**
 * Primary action control. Pill-shaped, brand green by default.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  /** primary = deep green, accent = lime, secondary = white card, ghost = text only */
  variant?: "primary" | "accent" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  /** leading glyph, usually <Icon name="…" /> */
  icon?: React.ReactNode;
  iconEnd?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  /** render as another element, e.g. "a" */
  as?: keyof JSX.IntrinsicElements;
}
export declare function Button(props: ButtonProps): JSX.Element;
