"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const COLLAPSED_HEIGHT = 120; // як .frontBrands-list.__toggle у shop.css
const TRANSITION = "height .6s ease";

export default function BrandsList({ brands }) {
  const listRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [fullHeight, setFullHeight] = useState(null);

  // повна висота списку змінюється разом із кількістю логотипів у ряду
  useEffect(() => {
    if (!expanded) return;
    const onResize = () => setFullHeight(listRef.current.scrollHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [expanded]);

  const toggle = (e) => {
    e.preventDefault();
    setFullHeight(listRef.current.scrollHeight);
    setExpanded((value) => !value);
  };

  // клас __toggle лишається завжди (обрізає зайве), висоту для анімації задаємо інлайном
  const style =
    fullHeight === null
      ? undefined
      : { height: expanded ? fullHeight : COLLAPSED_HEIGHT, transition: TRANSITION };

  return (
    <section className="frontBrands __grayscale">
      <div className="layout-wrap">
        <div className="frontBrands-container">
          <ul className="frontBrands-list __toggle" ref={listRef} style={style}>
            {brands.map((brand) => (
              <li className="frontBrands-i" key={brand.href}>
                <a className="frontBrands-a" href={brand.href}>
                  <img
                    alt={brand.name}
                    title=""
                    className="frontBrands-img"
                    width={brand.width}
                    height={brand.height}
                    src={brand.logo}
                  />
                </a>
              </li>
            ))}
          </ul>
          <div className="frontBrands-expander">
            <a
              className={`btn __large btn-styled frontBrands-toggle${expanded ? " is-expanded" : ""}`}
              href="#"
              role="button"
              aria-expanded={expanded}
              onClick={toggle}
            >
              <span className="btn-content">
                {expanded ? "Згорнути" : "Показати ще"}
                <Icon name="arrow-down-light" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
