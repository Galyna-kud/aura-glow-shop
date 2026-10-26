import InfoPage from "@/components/InfoPage";
import LineIcon from "@/components/LineIcon";

export const metadata = {
  title: "Обмін та повернення",
  openGraph: { title: "Обмін та повернення" },
};

const FEATURES = [
  { icon: "clock", title: "14 днів", text: "на повернення або обмін після отримання" },
  { icon: "truck", title: "За наш рахунок", text: "зворотна відправка товару" },
  { icon: "cash", title: "3 робочі дні", text: "на повернення коштів на картку" },
];

const CONDITIONS = [
  {
    icon: "check",
    title: "Товар належної якості",
    text: "Можна повернути, якщо він вам не підійшов, за умови, що:",
    items: [
      "з моменту отримання минуло не більше 14 днів;",
      "товар не використовувався, збережено його товарний вигляд і властивості;",
      "повністю збережена упаковка.",
    ],
  },
  {
    icon: "shield",
    title: "Товар неналежної якості",
    text: "Це товар, у якому виявлено недоліки, що:",
    items: [
      "взагалі не можуть бути усунуті;",
      "потребують на усунення понад 14 днів;",
      "роблять товар суттєво іншим, ніж передбачено.",
    ],
  },
];

const STEPS = [
  <>
    Зателефонуйте за номером <a href="tel:+380773003330">+380 77 300-33-30</a> і повідомте про намір повернути
    товар
  </>,
  "Зберіть товар у повній комплектації",
  "Відправте посилку Новою Поштою: м. Харків, відділення № 116",
];

export default function ExchangeReturnPage() {
  return (
    <InfoPage href="/obmin-ta-povernennya/" title="Обмін та повернення">
      <h1 className="main-h">Обмін та повернення</h1>
      <p className="info-lead">
        <strong>Aura Glow</strong> здійснює обмін і повернення товарів відповідно до Закону України «Про
        захист прав споживачів».
      </p>

      <div className="info-features">
        {FEATURES.map((item) => (
          <div className="info-feature" key={item.title}>
            <LineIcon name={item.icon} />
            <div>
              <div className="info-feature__title">{item.title}</div>
              <div className="info-feature__text">{item.text}</div>
            </div>
          </div>
        ))}
      </div>

      <section className="info-section">
        <h2 className="info-h">Умови повернення</h2>
        <div className="info-cards">
          {CONDITIONS.map((item) => (
            <div className="info-card" key={item.title}>
              <div className="info-card__icon">
                <LineIcon name={item.icon} />
              </div>
              <div className="info-card__title">{item.title}</div>
              <p className="info-card__text">{item.text}</p>
              <ul className="info-list">
                {item.items.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="info-section">
        <h2 className="info-h">Як повернути товар</h2>
        <ol className="info-steps">
          {STEPS.map((step, index) => (
            <li className="info-step" key={index}>
              <span className="info-step__num">{index + 1}</span>
              <span className="info-step__text">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="info-note">
        <LineIcon name="cash" />
        <div>
          <div className="info-note__title">Повернення коштів</div>
          <p className="info-note__text">
            Якщо товар відповідає умовам повернення, ми повернемо гроші на вашу банківську картку протягом{" "}
            <strong>3 робочих днів</strong>.
          </p>
        </div>
      </div>
    </InfoPage>
  );
}
