"use client";

import { useState } from "react";
import Icon from "./Icon";
import { formatDate, reviewsLabel } from "@/lib/reviews";

const SORTS = [
  { key: "new", title: "спочатку нові", compare: (a, b) => b.date.localeCompare(a.date) },
  { key: "rating", title: "по рейтингу", compare: (a, b) => b.rating - a.rating || b.date.localeCompare(a.date) },
  { key: "old", title: "спочатку старі", compare: (a, b) => a.date.localeCompare(b.date) },
];

function Stars({ rating }) {
  return (
    <div className="reviews-rating" aria-label={`Оцінка ${rating} з 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <div key={n} className={`reviews-rating__star${n <= rating ? " reviews-rating__star--active" : ""}`}>
          <Icon name="star" />
        </div>
      ))}
    </div>
  );
}

function Avatar({ className }) {
  return (
    <span className={className}>
      <svg className="icon-avatar-def" aria-hidden="true" focusable="false">
        <use href="#icon-avatar-def" />
      </svg>
    </span>
  );
}

// Вибір оцінки зірочками у формі нового відгуку
function RatingInput({ value, onChange }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <div className="store-reviews__rate">
      <span className="store-reviews__rate-title">Оцініть магазин</span>
      <div className="store-reviews__rate-stars" role="radiogroup" aria-label="Оцініть магазин" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            type="button"
            key={n}
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} з 5`}
            className={`store-reviews__rate-star${n <= shown ? " is-active" : ""}`}
            onMouseEnter={() => setHover(n)}
            onClick={() => onChange(n)}
          >
            <Icon name="star" />
          </button>
        ))}
      </div>
    </div>
  );
}

// Спільна форма для нового відгуку та відповіді; на сервер поки нічого не надсилається
function ReviewForm({ withRating, initialText = "", onDone }) {
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = data.get("text").trim();

    if (!data.get("name").trim()) return setError("Вкажіть, будь ласка, ім’я та прізвище.");
    if (!text || text === initialText.trim()) return setError("Напишіть, будь ласка, повідомлення.");
    if (withRating && !rating) return setError("Оцініть, будь ласка, магазин.");

    setError("");
    setSent(true);
    onDone?.();
  };

  if (sent) {
    return (
      <p className="store-reviews__thanks">
        Дякуємо! {withRating ? "Ваш відгук" : "Ваша відповідь"} з’явиться на сайті після перевірки модератором.
      </p>
    );
  }

  return (
    <form className="store-reviews__form" onSubmit={handleSubmit} noValidate>
      <Avatar className="store-reviews__form-avatar" />
      <div className="store-reviews__form-body">
        <input className="field __input" name="name" placeholder="Ім’я та прізвище" autoComplete="name" />
        <input className="field __input" name="email" type="email" placeholder="Е-пошта" autoComplete="email" />
        <textarea className="field __text" name="text" placeholder="Повідомлення" defaultValue={initialText} />
        {withRating && <RatingInput value={rating} onChange={setRating} />}
        {error && <p className="store-reviews__error">{error}</p>}
        <button type="submit" className="btn __special __large">
          <span className="btn-content">Надіслати</span>
        </button>
      </div>
    </form>
  );
}

function ReviewItem({ review, replyOpen, onReply }) {
  return (
    <div className="p-review__body" id={`comment-${review.id}`}>
      <div className="p-review__header">
        <span className="p-review-author">
          <Avatar className="p-review-author__photo" />
          <span className="p-review-author__name">{review.author}</span>
        </span>
        <span className="p-review-meta">
          <time className="p-review-meta__time" dateTime={review.date}>
            {formatDate(review.date)}
          </time>
        </span>
        <Stars rating={review.rating} />
      </div>
      <div className="p-review__content">{review.text}</div>
      <button type="button" className="p-review__reply store-reviews__reply-link" onClick={onReply}>
        {replyOpen ? "Скасувати" : "Відповісти"}
      </button>
      {replyOpen && (
        <div className="p-review-reply">
          <div className="p-review-reply__in">
            <ReviewForm initialText={`${review.author}, `} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function StoreReviews({ reviews }) {
  const [sort, setSort] = useState("new");
  const [replyTo, setReplyTo] = useState(null);

  const sorted = [...reviews].sort(SORTS.find((item) => item.key === sort).compare);
  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="store-reviews">
      <div className="store-reviews__header">
        <div className="store-reviews__header-actions">
          <div className="store-reviews__header-col">
            <div className="store-reviews__overall-rating">
              <div className="store-reviews__rating-value">{average.toFixed(1)}</div>
              <div className="store-reviews__rating-stars">
                <Stars rating={Math.round(average)} />
              </div>
              <div className="store-reviews__comments-count">{reviewsLabel(reviews.length)}</div>
            </div>
          </div>
          <div className="reviews-sorting">
            <span className="reviews-sorting__title">Сортування:</span>
            <div className="reviews-sorting__list">
              {SORTS.map((item) => (
                <button
                  type="button"
                  key={item.key}
                  className={`reviews-sorting__item${sort === item.key ? " is-active" : ""}`}
                  aria-pressed={sort === item.key}
                  onClick={() => setSort(item.key)}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-review p-review--full">
        {sorted.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            replyOpen={replyTo === review.id}
            onReply={() => setReplyTo(replyTo === review.id ? null : review.id)}
          />
        ))}
      </div>

      <section className="store-reviews__new">
        <h2 className="store-reviews__new-title">Новий відгук</h2>
        <ReviewForm withRating />
      </section>
    </div>
  );
}
