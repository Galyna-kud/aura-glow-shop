import Link from "next/link";
import Icon from "./Icon";
import navigation from "@/data/navigation.json";

// Текстова сторінка магазину: бічне меню (пункти меню сайту), крихти, заголовок, текст
export default function InfoPage({ href, title, children }) {
  return (
    <main id="main" className="main">
      <div className="layout-wrap">
        <div className="layout">
          <aside className="layout-aside">
            <nav className="sideMenu" aria-label="Інформація">
              <ul>
                {navigation.siteMenu.filter((item) => !item.footerOnly).map((item) => {
                  const active = item.href === href;
                  return (
                    <li className="sideMenu-i" key={item.href}>
                      <div className={`sideMenu-t${active ? " __active" : ""}`}>
                        <Link className="sideMenu-a" href={item.href} aria-current={active ? "page" : undefined}>
                          {item.title}
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
          <div className="layout-main">
            <div className="layout-main-inner">
              <nav className="breadcrumbs" aria-label="Навігаційний ланцюжок">
                <div className="breadcrumbs-i">
                  <Link href="/">Головна</Link>
                  <Icon name="arrow-down-light" />
                </div>
                <div className="breadcrumbs-i">
                  <span aria-current="page">{title}</span>
                </div>
              </nav>
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
