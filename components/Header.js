import Link from "next/link";
import Icon from "./Icon";
import HoverTooltip from "./HoverTooltip";
import MobileMenu from "./MobileMenu";
import navigation from "@/data/navigation.json";
import { PHONE } from "@/lib/contacts";

function SiteMenu() {
  return (
    <nav className="site-menu j-site-menu" aria-label="Меню сайту">
      {navigation.siteMenu.filter((item) => !item.footerOnly).map((item) => (
        <span className="site-menu__item" key={item.href}>
          <a className="site-menu__link" href={item.href}>
            {item.title}
          </a>
        </span>
      ))}
    </nav>
  );
}

function Search() {
  return (
    <div className="header__section header__section--search">
      <div className="search j-search">
        <form method="get" data-action="/katalog/search/">
          <button type="submit" className="search__button" disabled aria-label="пошук товарів">
            <Icon name="search" />
          </button>
          <input
            className="search__input"
            type="text"
            name="q"
            placeholder="Пошук товарів"
            autoComplete="off"
            defaultValue=""
            aria-label="Пошук товарів"
          />
        </form>
      </div>
      <div className="search__results"></div>
    </div>
  );
}

function Logo() {
  return (
    <div className="header__logo">
      <Link href="/" className="header__logo-link">
        <img
          src="/images/logo/aura-glow-logo-200.webp"
          alt="Aura Glow"
          className="header-logo-img"
          width="200"
          height="100"
          srcSet="/images/logo/aura-glow-logo-200.webp 1x, /images/logo/aura-glow-logo-400.webp 2x"
        />
      </Link>
    </div>
  );
}

function Phones() {
  return (
    <div className="header__section header__section--contacts">
      <div className="phones phones--header phones--dropdown">
        <div className="phones__container">
          <div className="phones__item phones__item--first">
            <div className="phones__item-icon">
              <Icon name="phone" />
            </div>
            <a href={PHONE.href} className="phones__item-link j-phone-item">
              {PHONE.label}
            </a>
            <div className="phones__item-arrow">
              <Icon name="arrow-down-light" />
            </div>
          </div>
          <div className="phones__dropdown">
            <div className="phones__list">
              <div className="phones__item">
                <div className="phones__item-icon">
                  <Icon name="phone" />
                </div>
                <a href={PHONE.href} className="phones__item-link j-phone-item">
                  {PHONE.label}
                </a>
              </div>
            </div>
            <div className="phones__callback">
              <button className="btn __as-link phones__callback-link" type="button">
                Передзвонити вам?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CatalogMenu() {
  return (
    <nav className="header__section header__section--catalog-menu" aria-label="Каталог">
      <div className="products-menu j-products-menu">
        <ul className="products-menu__container">
          {navigation.catalogMenu.map((item) => (
            <li className="products-menu__item j-submenu-item" key={item.href}>
              <div className="products-menu__title">
                <a className="products-menu__title-link" href={item.href}>
                  {item.title}
                </a>
              </div>
              {item.children && (
                <div className="productsMenu-submenu __fluidGrid">
                  <ul className="productsMenu-submenu-w">
                    {item.children.map((sub) => (
                      <li className="productsMenu-submenu-i" key={sub.href}>
                        <a className="productsMenu-submenu-a" href={sub.href}>
                          <span className="productsMenu-submenu-t">{sub.title}</span>
                        </a>
                        {sub.children && (
                          <ul className="productsMenu-list">
                            {sub.children.map((link) => (
                              <li className="productsMenu-list-i" key={link.href}>
                                <a href={link.href}>{link.title}</a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default function Header() {
  return (
    <header className="header">
      {/* телефони й планшети (до 1024px): шапка в один рядок + бургер; десктопна схована в mobile.css */}
      <MobileMenu />
      <div className="header__container">
        <div className="header__top">
          <div className="header__wrapper">
            <div className="header__layout header__layout--top">
              <div className="header__column header__column--left header__column--side"></div>
              <div className="header__column header__column--center">
                <div className="header__section">
                  <SiteMenu />
                </div>
              </div>
              <div className="header__column header__column--right header__column--side"></div>
            </div>
          </div>
        </div>
        <div className="header__middle">
          <div className="header__wrapper">
            <div className="header__layout header__layout--middle">
              <div className="header__column header__column--left header__column--side">
                <Search />
              </div>
              <div className="header__column header__column--center">
                <div className="header__section">
                  <Logo />
                </div>
              </div>
              <div className="header__column header__column--right header__column--side">
                <div className="header__section">
                  <HoverTooltip
                    className="favorites-view"
                    tooltipClassName="favorites-view__tooltip j-tooltip"
                    tooltip="Додайте товари до списку бажань"
                  >
                    <a
                      href="/profile/favorites/"
                      className="favorites-view__button j-favorite-link is-disabled"
                      aria-label="Бажання"
                    >
                      <div className="favorites-view__icon">
                        <div className="favorites-view__icon-container">
                          <span className="favorites-view__count j-count" style={{ display: "none" }}>
                            0
                          </span>
                          <Icon name="heart-outline" />
                        </div>
                      </div>
                    </a>
                  </HoverTooltip>
                </div>
                <div className="header__section">
                  <HoverTooltip
                    className="comparison-view"
                    tooltipClassName="comparison-view__tooltip j-tooltip"
                    tooltip="Додайте товари для порівняння"
                  >
                    <button
                      type="button"
                      className="comparison-view__button j-compare-link is-disabled"
                      aria-label="Порівняння"
                    >
                      <div className="comparison-view__icon">
                        <div className="comparison-view__icon-container">
                          <span className="comparison-view__count j-count" style={{ display: "none" }}>
                            0
                          </span>
                          <Icon name="round-checkbox" />
                        </div>
                      </div>
                    </button>
                  </HoverTooltip>
                </div>
                <Phones />
                <div className="header__section">
                  <div data-widget="userbar" data-skin="default">
                    <div className="userbar j-user-tabs">
                      <a className="userbar__button" href="#j-popup-tab-auth" aria-label="Вхід">
                        <Icon name="user-outline" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="header__section">
                  <HoverTooltip
                    className="basket-view"
                    tooltipClassName="basket-view__tooltip j-basket-tooltip"
                    tooltip="Додайте товари до кошика"
                  >
                    <div
                      className="basket j-basket-header is-empty"
                      data-widget="mini_cart"
                      data-skin="default"
                      data-icon="bag-outline"
                      data-elements="icon"
                      data-text-style="full"
                    >
                      <div className="basket__icon basket__icon--bag-outline j-basket-icon">
                        <Icon name="bag-outline" />
                        <div className="basket__items j-basket-quantity">0</div>
                      </div>
                    </div>
                  </HoverTooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header__bottom">
          <div className="header__wrapper">
            <div className="header__layout header__layout--bottom">
              <div className="header__column header__column--center">
                <CatalogMenu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
