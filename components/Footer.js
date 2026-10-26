import Link from "next/link";
import Icon from "./Icon";
import navigation from "@/data/navigation.json";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__wrapper wrapper">
          <div className="footer__columns">
            <div className="footer__col footer__col--double">
              <div className="footer__col-wrap">
                <div className="footer__logo">
                  <Link href="/" className="footer__logo-link" aria-label="Aura Glow — на головну">
                    <img
                      src="/images/logo/aura-glow-logo-200.webp"
                      alt="Aura Glow"
                      className="footer__logo-img"
                      width="200"
                      height="70"
                      role="presentation"
                      srcSet="/images/logo/aura-glow-logo-200.webp 1x, /images/logo/aura-glow-logo-400.webp 2x"
                    />
                  </Link>
                </div>
                <div className="footer__block">
                  Приймаємо до оплати
                  <div className="footer__payment">
                    <img
                      alt="Приймаємо оплату Visa/Mastercard"
                      width="140"
                      height="28"
                      src="/images/brand-logo/payment-logo.webp"
                    />
                  </div>
                </div>
                <div className="footer__copyright">© 2026</div>
              </div>
            </div>
            <div className="footer__col">
              <div className="footer__col-wrap">
                <div className="footer__block">
                  <div className="footer__heading">Каталог</div>
                  <ul className="footer__menu">
                    {navigation.catalogMenu.map((item) => (
                      <li className="footer__menu-item" key={item.href}>
                        <a href={item.href} className="footer__link">
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer__col">
              <div className="footer__col-wrap">
                <div className="footer__block">
                  <div className="footer__heading">Клієнтам</div>
                  <ul className="footer__menu">
                    <li className="footer__menu-item">
                      <a href="#" className="footer__link" role="button">
                        Вхід до кабінету
                      </a>
                    </li>
                    {navigation.siteMenu.map((item) => (
                      <li className="footer__menu-item" key={item.href}>
                        <a href={item.href} className="footer__link">
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer__col footer__col--double">
              <div className="footer__col-wrap">
                <div className="footer__heading">Контактна інформація</div>
                <div className="footer__contacts footer__contacts--columns">
                  <div className="footer__contacts-group">
                    <div className="footer__contacts-item">
                      <Icon name="phone" />
                      <a data-fake-href="tel:%2B380773003330" className="footer__contacts-item-link j-phone-item">
                        077 300-33-30
                      </a>
                    </div>
                    <button className="btn __as-link footer__link" type="button">
                      Передзвонити вам?
                    </button>
                  </div>
                  <div className="footer__contacts-group">
                    <div className="footer__contacts-item">
                      <Icon name="viber" />
                      <a data-fake-href="viber://chat?number=%2B380773003330" className="footer__link">
                        Підтримка 077 300-33-30 - тільки Вайбер
                      </a>
                    </div>
                    <div className="footer__contacts-item">
                      <Icon name="email" />
                      <a data-fake-href="mailto:cosmostyle.com.ua%40gmail.com" className="footer__link">
                        cosmostyle.com.ua@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="footer__contacts-group">
                    <Icon name="location" />
                    <div className="footer__address">Матюшенка 7б , м. Харків. 61033</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
