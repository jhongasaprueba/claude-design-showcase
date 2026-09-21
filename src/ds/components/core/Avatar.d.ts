import * as React from "react";

/** Round initials/photo mark for a client or supplier. */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** used for initials and the title attribute */
  name?: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg";
  tone?: "brand" | "accent" | "neutral";
}
export declare function Avatar(props: AvatarProps): JSX.Element;
