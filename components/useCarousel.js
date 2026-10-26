"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Логіка каруселі зі старого scripts/script.js:
// стрічка (track) рухається, а її батьківський блок (viewport) обрізає зайве
export default function useCarousel() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0); // номер першого видимого елемента
  // null — ще не виміряно (серверний HTML): стрілки без службових класів, як до запуску старого скрипта
  const [metrics, setMetrics] = useState(null);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = track.children;
    const total = items.length;
    let step = 0;
    if (total > 1) step = items[1].offsetLeft - items[0].offsetLeft;
    else if (total === 1) step = items[0].offsetWidth;
    const visible = step ? Math.max(1, Math.floor(track.parentElement.clientWidth / step + 0.05)) : 1;
    setMetrics({ step, visible, max: Math.max(0, total - visible) });
  }, []);

  useEffect(() => {
    const viewport = trackRef.current.parentElement;
    if (getComputedStyle(viewport).overflowX === "visible") {
      viewport.style.overflowX = CSS.supports?.("overflow-x", "clip") ? "clip" : "hidden";
    }

    measure();
    let raf = null;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("load", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", measure);
    };
  }, [measure]);

  const measured = metrics !== null;
  const { step, visible, max } = metrics ?? { step: 0, visible: 1, max: 0 };
  const current = Math.min(Math.max(index, 0), max);
  // якщо всі елементи вміщаються — стрілки не потрібні
  const hidden = measured && max === 0;

  const buttonProps = (atEdge, onClick) => {
    const disabled = measured && atEdge;
    return {
      className: `${hidden ? " __hidden is-hidden" : ""}${disabled ? " __disabled is-disabled" : ""}`,
      disabled,
      "aria-disabled": measured ? String(disabled) : undefined,
      onClick,
    };
  };

  return {
    trackRef,
    trackStyle: {
      overflow: "visible",
      transition: "transform .5s ease",
      transform: `translate3d(${-current * step}px, 0, 0)`,
    },
    // на початку — не гортається вліво, у кінці — вправо
    prev: buttonProps(current <= 0, () => setIndex(Math.max(current - visible, 0))),
    next: buttonProps(current >= max, () => setIndex(Math.min(current + visible, max))),
  };
}
