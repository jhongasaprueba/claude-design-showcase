import React from "react";
import { Avatar } from "../core/Avatar.jsx";

export function ContactCell({ name, note, tone = "brand", size = "sm", style, ...rest }) {
  return (
    <span style={Object.assign({ display: "inline-flex", alignItems: "center", gap: "10px", minWidth: 0 }, style)} {...rest}>
      <Avatar name={name} tone={tone} size={size} />
      <span style={{ minWidth: 0 }}>
        <span style={{ display: "block", fontSize: "14px", fontWeight: "var(--weight-medium)", color: "var(--text-heading)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
        {note ? <span style={{ display: "block", fontSize: "12px", color: "var(--text-muted)" }}>{note}</span> : null}
      </span>
    </span>
  );
}
