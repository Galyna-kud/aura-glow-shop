import { readFileSync } from "node:fs";
import path from "node:path";

// Спрайт вбудовується в HTML під час збірки (раніше його підвантажував fetch).
// Читається під час рендера, а не при завантаженні модуля — тоді next dev підхоплює зміни в sprite.svg
export default function IconSprite() {
  const sprite = readFileSync(
    path.join(process.cwd(), "public/images/icons/sprite.svg"),
    "utf8",
  );
  return (
    <div style={{ display: "none" }} dangerouslySetInnerHTML={{ __html: sprite }} />
  );
}
