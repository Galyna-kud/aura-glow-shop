"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { NAME_MAX, validateCallback } from "@/lib/callback";
import { PHONE } from "@/lib/contacts";

// Будь-яка кнопка «Передзвонити вам?» відкриває вікно через цю подію
const OPEN_EVENT = "callback:open";

// Маска телефону: людина вводить лише 9 цифр після «0», решту підставляємо самі
const PHONE_MASK = "+38 (0__) ___-__-__";

function formatPhone(digits) {
  let i = 0;
  return PHONE_MASK.replace(/_/g, () => digits[i++] ?? "_");
}

// Дістає 9 цифр номера з будь-якого введення: набраних по одній, вставлених чи підставлених автозаповненням
function parsePhone(value) {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("380")) digits = digits.slice(3);
  else if (digits.startsWith("38")) digits = digits.slice(2);
  else if (digits.startsWith("0")) digits = digits.slice(1);
  return digits.slice(0, 9);
}

function PhoneInput({ invalid, describedBy }) {
  const ref = useRef(null);
  const [digits, setDigits] = useState("");
  const [focused, setFocused] = useState(false);

  // курсор завжди стоїть на першому вільному місці маски
  const placeCaret = () => {
    const input = ref.current;
    const free = input.value.indexOf("_");
    const pos = free === -1 ? input.value.length : free;
    input.setSelectionRange(pos, pos);
  };

  useEffect(() => {
    if (focused) placeCaret();
  }, [digits, focused]);

  return (
    <input
      ref={ref}
      id="cb-phone"
      name="phone"
      type="tel"
      inputMode="tel"
      className={`field${invalid ? " __error" : ""}`}
      autoComplete="tel"
      placeholder={PHONE_MASK}
      value={focused || digits ? formatPhone(digits) : ""}
      onChange={(e) => setDigits(parsePhone(e.target.value))}
      // стирання прибирає останню цифру, навіть якщо перед курсором дужка чи дефіс
      onKeyDown={(e) => {
        if (e.key === "Backspace" || e.key === "Delete") {
          e.preventDefault();
          setDigits((d) => d.slice(0, -1));
        }
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onClick={placeCaret}
      aria-invalid={invalid}
      aria-describedby={describedBy}
    />
  );
}

export function CallbackButton({ className, onClick }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        window.dispatchEvent(new Event(OPEN_EVENT));
      }}
    >
      Передзвонити вам?
    </button>
  );
}

export default function CallbackModal() {
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [errors, setErrors] = useState({});
  const [formKey, setFormKey] = useState(0); // нове значення — порожня форма при кожному відкритті

  useEffect(() => {
    const onOpen = () => {
      setStatus("idle");
      setErrors({});
      setFormKey((k) => k + 1);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  // <dialog> сам тримає фокус усередині й закривається на Esc; сторінку під ним не прокручуємо
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open) return;
    dialog.showModal();
    dialog.querySelector("#cb-name")?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const values = Object.fromEntries(form);
    const { errors } = validateCallback(values);
    setErrors(errors);
    if (Object.keys(errors).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/callback/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="cb-modal"
      aria-labelledby="cb-modal-title"
      onClose={close}
      // клік по затемненню (поза вікном) закриває його
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="cb-modal__body">
        <button type="button" className="cb-modal__close" onClick={close} aria-label="Закрити">
          <Icon name="close" />
        </button>
        <h2 className="cb-modal__title" id="cb-modal-title">
          Передзвонити вам?
        </h2>

        {status === "done" ? (
          <>
            <p className="cb-modal__desc">Дякуємо! Ми передзвонимо вам найближчим часом.</p>
            <button type="button" className="cb-form__submit" onClick={close} autoFocus>
              Закрити
            </button>
          </>
        ) : (
          <form className="cb-form" key={formKey} onSubmit={onSubmit} noValidate>
            <p className="cb-modal__desc">Залиште ім&apos;я та номер телефону — ми передзвонимо.</p>
            <div className="cb-form__item">
              <label className="cb-form__label" htmlFor="cb-name">
                Ім&apos;я
              </label>
              <input
                id="cb-name"
                name="name"
                className={`field${errors.name ? " __error" : ""}`}
                autoComplete="name"
                maxLength={NAME_MAX}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "cb-name-error" : undefined}
              />
              {errors.name && (
                <div className="cb-form__error" id="cb-name-error">
                  {errors.name}
                </div>
              )}
            </div>
            <div className="cb-form__item">
              <label className="cb-form__label" htmlFor="cb-phone">
                Телефон
              </label>
              <PhoneInput invalid={!!errors.phone} describedBy={errors.phone ? "cb-phone-error" : undefined} />
              {errors.phone && (
                <div className="cb-form__error" id="cb-phone-error">
                  {errors.phone}
                </div>
              )}
            </div>
            {/* пастка для ботів: людина цього поля не бачить */}
            <input className="cb-form__hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            {status === "error" && (
              <div className="cb-form__error cb-form__error--submit" role="alert">
                Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам:{" "}
                <a href={PHONE.href}>{PHONE.label}</a>
              </div>
            )}
            <button type="submit" className="cb-form__submit" disabled={status === "sending"}>
              {status === "sending" ? "Надсилаємо…" : "Чекаю дзвінка"}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
