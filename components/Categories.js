"use client";

import useCarousel from "./useCarousel";

export default function Categories({ categories }) {
  const { trackRef, trackStyle, prev, next } = useCarousel();

  return (
    <section className="frontCategories">
      <div className="layout-wrap">
        <div className="frontCategories-container">
          <div className="h2">Популярні категорії</div>
          <div className="frontCategories-carousel">
            <div className="frontCategories-wrapper">
              <ul className="frontCategories-list" ref={trackRef} style={trackStyle}>
                {categories.map((category) => (
                  <li className="frontCategories-i" key={category.href}>
                    <a className="frontCategories-a" href={category.href}>
                      <div className="frontCategories-image">
                        <img
                          alt={category.title}
                          title=""
                          className="frontCategories-img"
                          width={category.width}
                          height={category.height}
                          src={category.image}
                        />
                      </div>
                      <div className="frontCategories-title">
                        <span className="a-link">{category.title}</span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              aria-label="Назад"
              {...prev}
              className={`slideCarousel-nav-btn __slideLeft${prev.className}`}
            ></button>
            <button
              type="button"
              aria-label="Вперед"
              {...next}
              className={`slideCarousel-nav-btn __slideRight${next.className}`}
            ></button>
          </div>
        </div>
      </div>
    </section>
  );
}
