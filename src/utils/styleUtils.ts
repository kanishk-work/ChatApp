export type Styles = string | React.CSSProperties;

export const applyStyles = (styles?: Styles) => {
  if (typeof styles === "string") {
    return { className: styles, style: {} };
  } else if (typeof styles === "object" && styles !== null) {
    return { className: "", style: styles };
  }
  return { className: "", style: {} };
};
