"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import navigation from "@/data/navigation.json";
import { PHONE, VIBER } from "@/lib/contacts";

// Кнопка «Каталог товарів» на головній відкриває панель каталогу через цю подію
const OPEN_CATALOG_EVENT = "mobile-menu:open-catalog";
// ширше за це мобільна шапка схована (див. mobile.css)
const DESKTOP_QUERY = "(min-width: 1025px)";

// Категорії одного рівня: з підкатегоріями — кнопка зі стрілкою, без — звичайне посилання
function CatalogList({ items, onOpen }) {
  return (
    <ul className="m-menu__list">
      {items.map((item) => (
        <li key={item.href}>
          {item.children ? (
            <button type="button" className="m-menu__row" onClick={() => onOpen(item)}>
              <span>{item.title}</span>
              <Icon name="arrow-down-light" />
            </button>
          ) : (
            <a className="m-menu__row" href={item.href}>
              {item.title}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

// Панель, що виїжджає (бургер — зліва, каталог — під шапкою)
function Panel({ open, className, label, head, children }) {
  return (
    <div
      className={`m-panel ${className}${open ? " is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="m-panel__head">{head}</div>
      <div className="m-panel__body">{children}</div>
    </div>
  );
}

function BackButton({ onClick, label }) {
  return (
    <button type="button" className="m-panel__icon m-panel__back" onClick={onClick} aria-label={label}>
      <Icon name="arrow-down-light" />
    </button>
  );
}

// Заголовок підрівня — посилання на саму категорію
function LevelTitle({ level, fallback }) {
  return (
    <div className="m-panel__title">
      {level ? <a href={level.href}>{level.title}</a> : fallback}
    </div>
  );
}

export function CatalogButton() {
  return (
    <div className="m-catalog-btn layout-wrap">
      <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_CATALOG_EVENT))}>
        <Icon name="catalog" />
        Каталог товарів
      </button>
    </div>
  );
}

export default function MobileMenu() {
  const [panel, setPanel] = useState(null); // null | "menu" | "catalog"
  const [stack, setStack] = useState([]); // відкриті категорії, остання — поточний рівень
  const [searchOpen, setSearchOpen] = useState(false);

  const level = stack[stack.length - 1];
  const push = (item) => setStack((s) => [...s, item]);
  const pop = () => setStack((s) => s.slice(0, -1));
  const open = (name) => {
    setStack([]);
    setSearchOpen(false);
    setPanel(name);
  };
  const close = () => setPanel(null);

  useEffect(() => {
    const onOpenCatalog = () => open("catalog");
    window.addEventListener(OPEN_CATALOG_EVENT, onOpenCatalog);
    return () => window.removeEventListener(OPEN_CATALOG_EVENT, onOpenCatalog);
  }, []);

  // поки панель відкрита: сторінка не прокручується, Esc і перехід на десктопну ширину закривають її
  useEffect(() => {
    if (!panel) return;
    const onKey = (e) => e.key === "Escape" && close();
    const desktop = window.matchMedia(DESKTOP_QUERY);
    desktop.addEventListener("change", close);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      desktop.removeEventListener("change", close);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [panel]);

  const siteMenu = navigation.siteMenu;

  return (
    <div className="m-header">
      <div className="m-header__bar">
        <div className="m-header__side">
          <button
            type="button"
            className="m-header__icon"
            aria-label="Меню"
            aria-expanded={panel === "menu"}
            onClick={() => open("menu")}
          >
            <Icon name="menu" />
          </button>
          <button
            type="button"
            className="m-header__icon"
            aria-label="Пошук"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Icon name="search" />
          </button>
        </div>
        <Link href="/" className="m-header__logo">
          <img
            src="/images/logo/aura-glow-logo-200.webp"
            alt="Aura Glow"
            width="200"
            height="100"
            srcSet="/images/logo/aura-glow-logo-200.webp 1x, /images/logo/aura-glow-logo-400.webp 2x"
          />
        </Link>
        <div className="m-header__side m-header__side--right">
          <button type="button" className="m-header__icon m-header__cart" aria-label="Кошик">
            <Icon name="bag-outline" />
          </button>
        </div>
      </div>

      {searchOpen && (
        <form className="m-search" method="get" data-action="/katalog/search/" onSubmit={(e) => e.preventDefault()}>
          <Icon name="search" />
          <input
            className="m-search__input"
            type="text"
            name="q"
            placeholder="Пошук товарів"
            autoComplete="off"
            aria-label="Пошук товарів"
            autoFocus
          />
        </form>
      )}

      <div className={`m-overlay${panel ? " is-open" : ""}`} onClick={close} aria-hidden="true"></div>

      <Panel
        open={panel === "menu"}
        className="m-panel--drawer"
        label="Меню"
        head={
          <>
            <BackButton onClick={level ? pop : close} label={level ? "Назад" : "Закрити меню"} />
            <LevelTitle level={level} fallback="Aura Glow" />
          </>
        }
      >
        {level ? (
          <CatalogList items={level.children} onOpen={push} />
        ) : (
          <>
            <CatalogList items={navigation.catalogMenu} onOpen={push} />
            <ul className="m-menu__list m-menu__list--pages">
              {siteMenu.map((item) => (
                <li key={item.href}>
                  <a className="m-menu__row" href={item.href}>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
            <div className="m-menu__section">
              <a className="m-menu__contact" href="#j-popup-tab-auth">
                <Icon name="user-outline" />
                Вхід для клієнтів
              </a>
            </div>
            <div className="m-menu__section">
              <a className="m-menu__contact" href={PHONE.href}>
                <Icon name="phone" />
                {PHONE.label}
              </a>
              <a className="m-menu__contact" href={VIBER.href}>
                <Icon name="viber" />
                {VIBER.label}
              </a>
              <button type="button" className="m-menu__callback">
                Передзвонити вам?
              </button>
            </div>
          </>
        )}
      </Panel>

      <Panel
        open={panel === "catalog"}
        className="m-panel--catalog"
        label="Каталог"
        head={
          <>
            {level ? <BackButton onClick={pop} label="Назад" /> : <span className="m-panel__icon"></span>}
            <LevelTitle level={level} fallback="Каталог" />
            <button type="button" className="m-panel__icon" onClick={close} aria-label="Закрити каталог">
              <Icon name="close" />
            </button>
          </>
        }
      >
        <CatalogList items={level ? level.children : navigation.catalogMenu} onOpen={push} />
      </Panel>
    </div>
  );
}
