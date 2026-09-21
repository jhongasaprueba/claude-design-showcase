import * as React from "react";

/** Circular single-glyph control used in card headers and toolbars. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  /** required — becomes aria-label and title */
  label: string;
  variant?: "surface" | "quiet" | "inverse";
  size?: "sm" | "md" | "lg";
  active?: boolean;
  disabled?: boolean;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
