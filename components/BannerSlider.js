"use client";

import { useEffect, useRef, useState } from "react";

const DELAY = 4000; // пауза між слайдами, мс
const SWIPE_THRESHOLD = 50; // мінімальна довжина свайпу, px

// width — ширина банера в макеті; файли -1440/-2880 віддаються як 1x і 2x від неї
export function Banner({ image, alt, href, width = 1440, sizes = "1440px" }) {
  return (
    <div className="banner">
      <div className="banner-image">
        <img
          src={`/images/banners/${image}-1440.webp`}
          alt={alt}
          className="banner-img"
          srcSet={`/images/banners/${image}-1440.webp ${width}w, /images/banners/${image}-2880.webp ${width * 2}w`}
          width={width}
          height="432"
          sizes={sizes}
        />
      </div>
      {href && <a className="banner-a" href={href} aria-label={alt}></a>}
    </div>
  );
}

export default function BannerSlider({ banners }) {
  const total = banners.length;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);

  // після останнього — знову перший
  const goTo = (index) => setCurrent((index + total) % total);

  // автоперегортання; таймер перезапускається після кожної зміни слайда
  useEffect(() => {
    if (total < 2 || paused) return;
    const timer = setTimeout(() => setCurrent((c) => (c + 1) % total), DELAY);
    return () => clearTimeout(timer);
  }, [current, paused, total]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const onTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > SWIPE_THRESHOLD) goTo(diff < 0 ? current + 1 : current - 1);
    setPaused(false);
  };

  return (
    <div className="banners-group">
      <section className="banners banners--block banners--gaps-none">
        <div className="banners__wrapper wrapper">
          <div className="banners__container">
            <div
              className="banners__slider"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="banners__slider-wrapper"
                style={{
                  transition: "transform .6s ease",
                  transform: `translate3d(${-current * 100}%, 0, 0)`,
                }}
              >
                {banners.map((banner) => (
                  <div className="banners__slider-i" key={banner.image}>
                    <div className="banners__item banners__item--radius-none banners__item--size-m">
                      <Banner {...banner} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="banners-pagination j-banners-pagination">
                {total > 1 &&
                  banners.map((banner, index) => (
                    <div
                      key={banner.image}
                      className={`banners-pagination__bullet${index === current ? " is-active" : ""}`}
                      role="button"
                      aria-label={`Слайд ${index + 1}`}
                      onClick={() => goTo(index)}
                    ></div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
