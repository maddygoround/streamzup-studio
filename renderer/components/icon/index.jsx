import icons from "./icons";
import React from "react";

const Icon = React.forwardRef(({ ...props }, ref) => {
  const { className = "", type = "", title = "", draggable } = props;
  let typeValue = icons.find((o) => o.id === type);
  return (
    <React.Fragment>
      {typeValue && (
        <i
          {...props}
          className={`custIcon custIcon-${typeValue.id} ${className} ${
            draggable ? "draggable" : ""
          }`}
          dangerouslySetInnerHTML={{ __html: typeValue.code }}
          title={title}
          ref={ref}
        ></i>
      )}
    </React.Fragment>
  );
});

export default Icon;
