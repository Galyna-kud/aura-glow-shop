import Header from "./Header";
import Footer from "./Footer";
import Icon from "./Icon";

// Каркас сторінки: шапка, вміст, футер.
// Клас homepage прибирає відступ під шапкою (правила .homepage … у shop.css)
export default function PageShell({ homepage = false, children }) {
  return (
    <div className={`container${homepage ? " homepage" : ""}`}>
      <Header />
      {children}
      <Footer />
      <div className="upButton" id="upButton">
        <button type="button" className="upButton-btn" aria-label="Вгору">
          <span className="upButton-btn__hint" aria-hidden="true">
            Вгору
          </span>
          <Icon name="arrow-up" />
        </button>
      </div>
    </div>
  );
}
