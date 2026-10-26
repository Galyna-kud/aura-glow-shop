import "./shop.css";
import "./custom.css";
import "./mobile.css";
import IconSprite from "@/components/IconSprite";

export const metadata = {
  title: { default: "Aura Glow", template: "%s — Aura Glow" },
  description:
    "Купити косметику для тіла, обличчя, помаду, сонцезахисний крем та парфумерію в інтернет-магазині Aura Glow. Великий вибір натуральної та професійної косметики, доглядових засобів, а також іграшок для дітей — водяні пістолети, автомати, машинки, головоломки, настільні ігри. Швидка доставка по Україні, оригінальна продукція, вигідні ціни та персональний сервіс. Зробіть замовлення легко і зручно на Aura Glow!",
  robots: "all",
  icons: { icon: "/images/logo/favicon.ico" },
  openGraph: {
    locale: "ua_UA",
    siteName: "Aura Glow",
    title: "Головна",
    description: "Aura Glow - косметика для всієї родини ",
    type: "website",
  },
};

// Шапка й футер — у components/PageShell (підключається в app/(home) і app/(pages))
export default function RootLayout({ children }) {
  return (
    <html lang="uk" prefix="og: https://ogp.me/ns#">
      <body className="ua-UA" itemScope itemType="https://schema.org/WebPage">
        <IconSprite />
        <a href="#main" className="skip-link">
          Перейти до основного контенту
        </a>
        <div className="session-messages" id="j-sm" style={{ display: "none" }}></div>
        {children}
        <div className="sr-only" aria-live="polite" aria-atomic="true" id="a11y-announcer"></div>
        <div id="modal-overlay" className="overlay"></div>
      </body>
    </html>
  );
}
