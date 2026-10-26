// "2025-10-27T13:42:00+02:00" -> "27.10.2025 в 13:42" (без перерахунку часового поясу)
export function formatDate(iso) {
  const [, y, m, d, time] = iso.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2})/);
  return `${d}.${m}.${y} в ${time}`;
}

// 1 відгук, 2 відгуки, 5 відгуків, 21 відгук
export function reviewsLabel(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return `${count} відгук`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${count} відгуки`;
  return `${count} відгуків`;
}
