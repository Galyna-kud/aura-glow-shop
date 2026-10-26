import InfoPage from "@/components/InfoPage";
import LineIcon from "@/components/LineIcon";

export const metadata = {
  title: "Про нас",
  openGraph: { title: "Про нас" },
};

const REASONS = [
  {
    icon: "box",
    title: "Усе в одному місці",
    text: "Сотні засобів від різних брендів в одному каталозі — не потрібно шукати по різних магазинах.",
  },
  {
    icon: "check",
    title: "Оригінальна продукція",
    text: "Працюємо напряму з офіційними постачальниками, тому ви отримуєте оригінальні засоби без підробок.",
  },
  {
    icon: "tag",
    title: "Доступні ціни",
    text: "Широкий ціновий діапазон — від бюджетних засобів до преміальних брендів.",
  },
  {
    icon: "chat",
    title: "Чесні описи та консультація",
    text: "Зрозумілі описи товарів і допомога з вибором, якщо сумніваєтесь, що обрати.",
  },
  {
    icon: "truck",
    title: "Швидка доставка по Україні",
    text: "Відправляємо замовлення якнайшвидше, щоб ви не чекали на свої покупки.",
  },
  {
    icon: "sparkle",
    title: "Постійні новинки",
    text: "Регулярно поповнюємо асортимент трендовими та перевіреними засобами.",
  },
];

export default function AboutPage() {
  return (
    <InfoPage href="/pro-nas/" title="Про нас">
      <h1 className="main-h">Aura Glow — сучасна платформа для покупки косметики</h1>
      <div className="info-text">
        <p>
          <strong>Aura Glow</strong> — це інтернет-магазин, де купувати косметику просто й зручно. Ми зібрали
          великий вибір продукції, доступні ціни та уважний сервіс, щоб ви могли за кілька хвилин знайти
          потрібний засіб і оформити замовлення, не виходячи з дому.
        </p>
        <p>
          У нашому каталозі — догляд за обличчям, тілом і волоссям, декоративна та корейська косметика.
        </p>
      </div>

      <section className="info-section">
        <h2 className="info-h">Чому зручно купувати в Aura Glow</h2>
        <div className="info-cards info-cards--3">
          {REASONS.map((item) => (
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

      <section className="info-final">
        <h2 className="info-final__title">Купуйте косметику легко разом з Aura Glow</h2>
        <p>Дякуємо, що обираєте нас!</p>
      </section>
    </InfoPage>
  );
}
