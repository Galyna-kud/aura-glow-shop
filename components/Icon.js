// Іконка зі спрайта (див. IconSprite)
export default function Icon({ name }) {
  return (
    <svg className={`icon icon--${name}`} aria-hidden="true" focusable="false">
      <use href={`#icon-${name}`} />
    </svg>
  );
}
