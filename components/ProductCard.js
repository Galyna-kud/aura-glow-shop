import Icon from "./Icon";
import { formatPrice, getDiscount, imageSize, isSale, productUrl } from "@/lib/products";

const STOCK = {
  in_stock: { label: "В наявності", color: "#17b260" },
};

function Sticker({ type, color, children }) {
  return (
    <div className={`productSticker-item __${type}`} style={{ color }}>
      <div className="productSticker-container">
        <div className="productSticker-content" style={{ color: "#fff" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Stars() {
  return [1, 2, 3, 4, 5].map((n) => <Icon key={n} name="star" />);
}

export default function ProductCard({ product }) {
  const url = productUrl(product);
  const discount = getDiscount(product);
  const stock = STOCK[product.stock];
  const { width, height } = imageSize(product.image);
  const imageAlt = `${product.name} ${product.sku} фото`;

  return (
    <div className="catalogCard j-catalog-card">
      <div className="catalogCard-box j-product-container">
        <div className="catalogCard-main">
          <div className="catalogCard-main-b">
            <div className="catalogCard-view">
              <a href={url} className="catalogCard-image" aria-label={product.name}>
                <div className="catalogCard-image-i">
                  <img
                    alt={imageAlt}
                    title={imageAlt}
                    className="catalogCard-img"
                    width={width}
                    height={height}
                    src={product.image}
                  />
                </div>
              </a>
              <div className="productSticker __modern">
                {product.isHit && (
                  <Sticker type="popular" color="#5e5e5e">
                    Хіт
                  </Sticker>
                )}
                {product.isNew && (
                  <Sticker type="new" color="#212121">
                    Новинка
                  </Sticker>
                )}
                {isSale(product) && (
                  <Sticker type="promo" color="#ff5252">
                    Розпродаж
                  </Sticker>
                )}
                {discount > 0 && (
                  <Sticker type="discount" color="#ff5252">
                    −{discount}%
                  </Sticker>
                )}
              </div>
            </div>
            <div className="catalogCard-info">
              <div className="catalogCard-meta">
                <div className="catalogCard-code">Артикул: {product.sku}</div>
                {product.reviewsCount > 0 && (
                  <div className="catalogCard-rating-wrapper">
                    <div className="catalogCard-rating">
                      <div className="rating-stars">
                        <div className="rating-stars__empty">
                          <Stars />
                        </div>
                        <div
                          className="rating-stars__filled j-rating-stars"
                          style={{ width: `${(product.rating / 5) * 100}%` }}
                        >
                          <Stars />
                        </div>
                      </div>
                    </div>
                    <div className="catalogCard-comments">
                      <a href={`${url}#comments`} className="a-btn">
                        <Icon name="comments" />
                        {product.reviewsCount}
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div className="catalogCard-title">
                <a href={url} title={product.name} aria-label={product.name}>
                  {product.name}
                </a>
              </div>
              <div className="catalogCard-priceBox">
                {discount > 0 && <div className="catalogCard-oldPrice">{formatPrice(product.oldPrice)}</div>}
                <div className="catalogCard-price">{formatPrice(product.price)}</div>
              </div>
              {stock && (
                <div className="catalogCard-availability" style={{ color: stock.color }}>
                  {stock.label}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="catalogCard-extra j-download-required __loading">
          <div className="loader"></div>
        </div>
      </div>
    </div>
  );
}
