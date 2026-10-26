"use client";

import useCarousel from "./useCarousel";

export default function BlogPreview({ posts }) {
  const { trackRef, trackStyle, prev, next } = useCarousel();

  return (
    <div className="front-news">
      <div className="layout-wrap">
        <div className="front-news__container">
          <section className="entries">
            <div className="h2">
              <a href="/bloh/">Блог</a>
            </div>
            <div className="carousel">
              <div className="entries-container">
                <ul className="entries-list __4to6" ref={trackRef} style={trackStyle}>
                  {posts.map((post) => (
                    <li className="entries-i" key={post.href}>
                      <a href={post.href} className="a entries-i-wrap">
                        <div className="entries-i-image">
                          <img alt="" className="entries-i-img" width="300" height="200" src={post.image} />
                        </div>
                        <div className="entries-i-date">{post.date}</div>
                        <div className="entries-i-title">
                          <span className="a-link">{post.title}</span>
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
                className={`carousel-btn carousel-btn--prev j-carousel-btn-prev${prev.className}`}
              ></button>
              <button
                type="button"
                aria-label="Вперед"
                {...next}
                className={`carousel-btn carousel-btn--next j-carousel-btn-next${next.className}`}
              ></button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
