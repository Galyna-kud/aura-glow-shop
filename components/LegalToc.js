"use client";

const DURATION = 800; // мс — тривалість прокрутки до розділу
const OFFSET = 20; // відступ від верху екрана, як scroll-margin-top у .legal-section

const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

function scrollToElement(element) {
  const start = window.scrollY;
  const target = element.getBoundingClientRect().top + start - OFFSET;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, target);
    return;
  }

  const startTime = performance.now();
  const step = (now) => {
    const progress = Math.min((now - startTime) / DURATION, 1);
    window.scrollTo(0, start + (target - start) * easeInOut(progress));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Зміст «Угоди користувача» з плавною прокруткою до розділів
export default function LegalToc({ items }) {
  const handleClick = (event, id) => {
    const element = document.getElementById(id);
    if (!element) return;
    event.preventDefault();
    scrollToElement(element);
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav className="legal-toc" aria-label="Зміст">
      <div className="legal-toc__title">Зміст</div>
      <ol>
        {items.map((title, index) => {
          const id = `section-${index + 1}`;
          return (
            <li key={title}>
              <a href={`#${id}`} onClick={(event) => handleClick(event, id)}>
                {title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
