// Перевірка заявки «Передзвонити вам?» — спільна для форми (браузер) і API (сервер)
export const NAME_MAX = 50;

// Приймає 0XX XXX XX XX або +380 XX XXX XX XX у будь-якому записі, повертає +380XXXXXXXXX або null
export function normalizePhone(value) {
  const digits = String(value ?? "").replace(/\D/g, "");
  if (/^0\d{9}$/.test(digits)) return `+38${digits}`;
  if (/^380\d{9}$/.test(digits)) return `+${digits}`;
  return null;
}

export function validateCallback({ name, phone }) {
  const cleanName = String(name ?? "").trim();
  const cleanPhone = normalizePhone(phone);
  const errors = {};
  if (cleanName.length < 2 || cleanName.length > NAME_MAX) errors.name = "Вкажіть ваше ім'я";
  if (!cleanPhone) errors.phone = "Вкажіть номер телефону повністю";
  return { errors, data: { name: cleanName, phone: cleanPhone } };
}
