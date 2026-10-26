"use client";

import Icon from "./Icon";
import useCarousel from "./useCarousel";
import { formatDate } from "@/lib/reviews";

function ReviewItem({ review }) {
  return (
    <div className="review-item j-review-item" itemProp="comment" itemScope itemType="https://schema.org/Comment">
      <div className="review-item__header">
        <span className="review-item__author" itemProp="author" itemScope itemType="https://schema.org/Person">
          <span className="review-item__avatar">
            <svg className="icon-avatar-def" aria-hidden="true" focusable="false">
              <use href="#icon-avatar-def" />
            </svg>
          </span>
          <span className="review-item__name" itemProp="name">
            {review.author}
          </span>
        </span>
        <div className="review-item__rating reviews-rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className={`reviews-rating__star${n <= review.rating ? " reviews-rating__star--active" : ""}`}
            >
              <Icon name="star" />
            </div>
          ))}
        </div>
        <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
          <meta itemProp="worstRating" content="1" />
          <meta itemProp="ratingValue" content={String(review.rating)} />
          <meta itemProp="bestRating" content="5" />
        </div>
        <div className="review-item__date" dateTime={review.date}>
          <meta itemProp="datePublished" content={review.date} />
          {formatDate(review.date)}
        </div>
      </div>
      <div className="review-item__body">
        <div className="review-item__text j-review-item-text" itemProp="text">
          {review.text}
        </div>
        <div className="review-item__more-link j-review-item-link">
          <a href={`/store-reviews/#comment-${review.id}`}>Читати далі</a>
        </div>
      </div>
    </div>
  );
}

export default function Reviews({ reviews }) {
  const { trackRef, trackStyle, prev, next } = useCarousel();

  return (
    <div className="top-reviews j-top-reviews">
      <div className="top-reviews__wrap layout-wrap">
        <div className="top-reviews__container">
          <div className="h2">Відгуки про магазин</div>
          <div className="top-reviews__carousel">
            <div className="top-reviews__carousel-container j-carousel-container">
              <ul className="top-reviews__carousel-wrapper j-carousel-wrapper" ref={trackRef} style={trackStyle}>
                {reviews.map((review) => (
                  <li className="top-reviews__item j-carousel-item" key={review.id}>
                    <ReviewItem review={review} />
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
          <div className="top-reviews__button">
            <a href="/store-reviews/" className="btn __large btn-styled btn-styled--next">
              <span className="btn-content">
                Всі відгуки
                <Icon name="arrow-down-light" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
