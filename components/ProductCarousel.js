"use client";

import ProductCard from "./ProductCard";
import useCarousel from "./useCarousel";

export default function ProductCarousel({ title, rel, products }) {
  const { trackRef, trackStyle, prev, next } = useCarousel();

  return (
    <section className="promo">
      <div className="layout-wrap">
        <div className="promo-container">
          <div className="catalogTabs">
            <nav className="catalogTabs-nav">
              <ul className="catalogTabs-nav-box">
                <li className="catalogTabs-nav-i __active" rel={rel}>
                  <span className="catalogTabs-nav-a">{title}</span>
                </li>
              </ul>
            </nav>

            <div className="catalogTabs-content j-special-offers-content" style={{ display: "block" }}>
              <section className="promo-section">
                <div className="slideCarousel-screen">
                  <div className="catalog-carousel">
                    <div className="catalog-carousel__container promo-slider">
                      <ul
                        className="catalog-carousel__wrap promo-slider-list"
                        data-parent-class="catalog-grid"
                        ref={trackRef}
                        style={trackStyle}
                      >
                        {products.map((product) => (
                          <li className="catalog-carousel__item promo-slider-i" key={product.sku}>
                            <ProductCard product={product} />
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
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
