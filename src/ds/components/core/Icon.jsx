import React from "react";

/* Lucide is loaded from CDN (see readme ICONOGRAPHY). This wrapper renders a
   placeholder <i data-lucide> node and asks Lucide to hydrate it after mount. */
export function Icon({ name, size = 18, strokeWidth = 1.75, color = "currentColor", style, ...rest }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !window.lucide) return;
    el.innerHTML = "";
    const i = document.createElement("i");
    i.setAttribute("data-lucide", name);
    el.appendChild(i);
    window.lucide.createIcons({
      attrs: { width: size, height: size, "stroke-width": strokeWidth, stroke: color },
      nameAttr: "data-lucide", root: el
    });
  }, [name, size, strokeWidth, color]);
  return <span ref={ref} aria-hidden="true" style={Object.assign({ display: "inline-flex", width: size + "px", height: size + "px", flexShrink: 0 }, style)} {...rest} />;
}
