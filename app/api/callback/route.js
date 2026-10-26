import { validateCallback } from "@/lib/callback";

// Заявка «Передзвонити вам?» → повідомлення в Telegram.
// Потрібні змінні середовища TELEGRAM_BOT_TOKEN і TELEGRAM_CHAT_ID (.env.local і Vercel → Settings → Environment Variables)

// Своєї бази в нас немає, тож номер останньої заявки бот зберігає у власному описі
// для мови, якою ніхто не користується, — у чаті його не видно
const COUNTER_LANG = "eo";

async function telegram(method, params) {
  const res = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(`${method}: ${data.description}`);
  return data.result;
}

async function readCounter() {
  const { description } = await telegram("getMyDescription", { language_code: COUNTER_LANG });
  const count = Number(description);
  return Number.isInteger(count) ? count : 0;
}

function saveCounter(count) {
  return telegram("setMyDescription", { description: String(count), language_code: COUNTER_LANG });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Некоректний запит" }, { status: 400 });
  }

  // приховане поле заповнюють лише боти — робимо вигляд, що все добре, і нічого не надсилаємо
  if (body.website) return Response.json({ ok: true });

  const { errors, data } = validateCallback(body);
  if (Object.keys(errors).length) return Response.json({ errors }, { status: 400 });

  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!process.env.TELEGRAM_BOT_TOKEN || !chatId) {
    console.error("callback: TELEGRAM_BOT_TOKEN або TELEGRAM_CHAT_ID не задані");
    return Response.json({ error: "Відправка не налаштована" }, { status: 500 });
  }

  // збій лічильника не повинен губити заявку — тоді вона просто прийде без номера
  let number = null;
  try {
    number = (await readCounter()) + 1;
  } catch (err) {
    console.error("callback: не вдалося прочитати лічильник", err);
  }

  const text = [
    number ? `📞 Заявка ${number}` : "📞 Заявка",
    `👤 ${data.name}`,
    `☎️ ${data.phone}`,
  ].join("\n");

  try {
    await telegram("sendMessage", { chat_id: chatId, text });
  } catch (err) {
    console.error("callback: не вдалося надіслати в Telegram", err);
    return Response.json({ error: "Не вдалося надіслати" }, { status: 502 });
  }

  if (number) {
    try {
      await saveCounter(number);
    } catch (err) {
      console.error("callback: не вдалося оновити лічильник", err);
    }
  }

  return Response.json({ ok: true });
}
