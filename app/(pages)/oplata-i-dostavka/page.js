import Link from "next/link";
import InfoPage from "@/components/InfoPage";
import LineIcon from "@/components/LineIcon";

export const metadata = {
  title: "Оплата і доставка",
  openGraph: { title: "Оплата і доставка" },
};

const FEATURES = [
  { icon: "box", title: "1 робочий день", text: "на відправку після підтвердження замовлення" },
  { icon: "clock", title: "1–3 робочі дні", text: "орієнтовний термін доставки" },
];

const PAYMENT = [
  {
    icon: "card",
    title: "Онлайн-оплата на сайті",
    text: "Банківською карткою Visa або Mastercard через платіжну систему WayForPay. Швидко й безпечно — одразу під час оформлення замовлення.",
  },
  {
    icon: "cash",
    title: "Післяплата",
    text: "Оплата під час отримання у відділенні, поштоматі або кур’єру Нової Пошти.",
  },
];

const DELIVERY = [
  { icon: "home", title: "До відділення", price: "від 80 грн" },
  { icon: "locker", title: "До поштомату", price: "від 60 грн" },
  { icon: "pin", title: "Кур’єром", price: "від 100 грн" },
];

const STEPS = [
  "Додайте товари до кошика",
  "Натисніть «Оформити» та вкажіть ім’я, телефон і дані доставки",
  "Оберіть спосіб оплати",
  "Очікуйте ваше замовлення",
];

const CHECKLIST = [
  "цілісність упаковки;",
  "комплектацію;",
  "відповідність товару замовленню;",
  "відсутність механічних пошкоджень.",
];

export default function PaymentDeliveryPage() {
  return (
    <InfoPage href="/oplata-i-dostavka/" title="Оплата і доставка">
      <h1 className="main-h">Оплата і доставка</h1>
      <p className="info-lead">
        Ми хочемо, щоб покупки в <strong>Aura Glow</strong> були простими й зручними — від оформлення
        замовлення до моменту, коли улюблені засоби опиняться у ваших руках.
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
        <h2 className="info-h">Способи оплати</h2>
        <div className="info-cards">
          {PAYMENT.map((item) => (
            <div className="info-card" key={item.title}>
              <div className="info-card__icon">
                <LineIcon name={item.icon} />
              </div>
              <div className="info-card__title">{item.title}</div>
              <p className="info-card__text">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="info-note">
        <LineIcon name="cash" />
        <div>
          <div className="info-note__title">Зверніть увагу: комісія за післяплату</div>
          <p className="info-note__text">
            При виборі післяплати Нова Пошта стягує комісію за переказ коштів згідно зі своїми тарифами:{" "}
            <strong>20 грн + 2% від суми переказу</strong>.
          </p>
          <p className="info-note__text">
            Цю комісію отримує виключно Нова Пошта — Aura Glow не отримує цих коштів і не може їх
            компенсувати.
          </p>
        </div>
      </div>

      <section className="info-section">
        <h2 className="info-h">Доставка «Новою Поштою»</h2>
        <p className="info-sub">
          Доставляємо по всій Україні. Вартість розраховує перевізник за своїми тарифами — вона залежить від
          ваги, габаритів посилки та населеного пункту.
        </p>
        <div className="info-options">
          {DELIVERY.map((item) => (
            <div className="info-option" key={item.title}>
              <LineIcon name={item.icon} />
              <div className="info-option__title">{item.title}</div>
              <div className="info-option__text">{item.price}</div>
            </div>
          ))}
        </div>
        <p className="info-sub" style={{ marginTop: 16 }}>
          Відстежити посилку можна на сайті або в мобільному застосунку Нової Пошти.
        </p>
      </section>

      <section className="info-section">
        <h2 className="info-h">Як оформити замовлення</h2>
        <ol className="info-steps">
          {STEPS.map((step, index) => (
            <li className="info-step" key={step}>
              <span className="info-step__num">{index + 1}</span>
              <span className="info-step__text">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="info-note">
        <LineIcon name="shield" />
        <div>
          <div className="info-note__title">Отримання замовлення</div>
          <p className="info-note__text">Під час отримання радимо уважно перевірити:</p>
          <ul className="info-list">
            {CHECKLIST.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
          <p className="info-note__text" style={{ marginTop: "0.8em" }}>
            Якщо виявили пошкодження чи невідповідність — повідомте працівника Нової Пошти та одразу
            зв’яжіться з нами. Якщо забрати посилку без перевірки, претензії щодо механічних пошкоджень або
            неповної комплектації можуть бути відхилені, бо неможливо встановити, коли вони виникли. Детальніше
            — на сторінці <Link href="/obmin-ta-povernennya/">«Обмін та повернення»</Link>.
          </p>
        </div>
      </div>
    </InfoPage>
  );
}
