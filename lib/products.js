// Похідні значення товару — рахуються з даних, у JSON не зберігаються

export function getDiscount(product) {
  if (!product.oldPrice || product.oldPrice <= product.price) return 0;
  return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
}

// «Розпродаж» — товар зі знижкою, який не є хітом чи новинкою
// (так було розставлено мітки в старому сайті)
export function isSale(product) {
  return getDiscount(product) > 0 && !product.isHit && !product.isNew;
}

export function formatPrice(value) {
  return `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} грн`;
}

export function productUrl(product) {
  return `/${product.slug}/`;
}

// розмір зображення закодований у шляху: /content/images/42/356x447l95nn0/...
export function imageSize(src) {
  const match = src.match(/\/(\d+)x(\d+)l/);
  return match ? { width: +match[1], height: +match[2] } : { width: 356, height: 447 };
}
