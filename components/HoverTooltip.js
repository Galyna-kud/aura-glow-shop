"use client";

import { useState } from "react";

// Заміна jQuery .dropdown(): підказка отримує is-visible, поки курсор над блоком
export default function HoverTooltip({ className, tooltipClassName, tooltip, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={className}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <div className={`${tooltipClassName}${visible ? " is-visible" : ""}`}>{tooltip}</div>
    </div>
  );
}
