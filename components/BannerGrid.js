import { Banner } from "./BannerSlider";

// Два банери в ряд між каруселями товарів
export default function BannerGrid({ banners }) {
  return (
    <div className="banners-group">
      <section className="banners banners--2x banners--gaps-l">
        <div className="banners__wrapper wrapper">
          <div className="banners__container">
            <div className="banners__grid">
              {banners.map((banner) => (
                <div className="banners__col banners__col--1of2" key={banner.image}>
                  <div className="banners__item banners__item--radius-none banners__item--size-m">
                    <Banner
                      {...banner}
                      width={720}
                      sizes="(max-width: 1024px) 512px, (min-width: 1440px) 720px, 50vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
