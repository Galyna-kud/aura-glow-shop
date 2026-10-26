"use client";

import { useEffect, useRef, useState } from "react";

const COLLAPSED_HEIGHT = 182; // як .frontInfo-text.__clip у shop.css
const TRANSITION = "max-height .6s ease";

// Обгортка SEO-тексту: згорнутий стан дає CSS-клас __clip (висота + градієнт),
// для плавної анімації max-height задаємо інлайном
export default function ExpandableText({ children }) {
  const textRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [fullHeight, setFullHeight] = useState(null);

  useEffect(() => {
    if (!expanded) return;
    const onResize = () => setFullHeight(textRef.current.scrollHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [expanded]);

  const toggle = () => {
    setFullHeight(textRef.current.scrollHeight);
    setExpanded((value) => !value);
  };

  const style =
    fullHeight === null
      ? undefined
      : { maxHeight: expanded ? fullHeight : COLLAPSED_HEIGHT, transition: TRANSITION };

  return (
    <>
      <div
        className={`frontInfo-text j-seo-text-expander${expanded ? "" : " __clip"}`}
        ref={textRef}
        style={style}
      >
        {children}
      </div>
      <button
        type="button"
        className="btn __as-link frontInfo-toggle"
        aria-expanded={expanded}
        onClick={toggle}
      >
        {expanded ? "Згорнути" : "Розгорнути"}
      </button>
    </>
  );
}
