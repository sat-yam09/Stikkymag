"use client";

import { useState } from "react";
import type { CheckoutDetails } from "@/lib/types";

type CheckoutFormProps = {
  cartCount: number;
  onPlaceOrder: (details: CheckoutDetails) => void;
};

const initialValues: CheckoutDetails = {
  name: "",
  phone: "",
  address: "",
  note: "",
};

export function CheckoutForm({
  cartCount,
  onPlaceOrder,
}: CheckoutFormProps) {
  const [details, setDetails] = useState<CheckoutDetails>(initialValues);
  const [formError, setFormError] = useState<string | null>(null);

  function updateField(field: keyof CheckoutDetails, value: string) {
    setDetails((currentValue) => ({
      ...currentValue,
      [field]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (cartCount === 0) {
      setFormError("Add at least one item to the cart before checkout.");
      return;
    }

    if (!details.name.trim() || !details.phone.trim() || !details.address.trim()) {
      setFormError("Please fill in your name, phone number, and address.");
      return;
    }

    const digits = details.phone.replace(/\D/g, "");

    if (digits.length < 10) {
      setFormError("Please enter a valid phone number.");
      return;
    }

    setFormError(null);

    onPlaceOrder({
      ...details,
      name: details.name.trim(),
      phone: details.phone.trim(),
      address: details.address.trim(),
      note: details.note.trim(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-white/8 bg-[#111111] p-5 text-white shadow-[0_18px_44px_rgba(0,0,0,0.2)]"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#ffd54a]">
            Checkout
          </p>
          <h3 className="mt-2 font-display text-3xl uppercase tracking-[-0.04em] text-white">
            Delivery details
          </h3>
        </div>
        <span className="rounded-full bg-[#ffd54a] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black">
          WhatsApp
        </span>
      </div>

      <div className="mt-5 grid gap-4">
        <label className="grid gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-white/72">
          Name
          <input
            type="text"
            value={details.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="h-14 rounded-[1.2rem] border border-white/10 bg-white/7 px-4 text-sm text-white outline-none transition-colors placeholder:text-white/34 focus:border-[#ffd54a]"
            placeholder="Full name"
          />
        </label>

        <label className="grid gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-white/72">
          Phone number
          <input
            type="tel"
            value={details.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="h-14 rounded-[1.2rem] border border-white/10 bg-white/7 px-4 text-sm text-white outline-none transition-colors placeholder:text-white/34 focus:border-[#ffd54a]"
            placeholder="+91 98765 43210"
          />
        </label>

        <label className="grid gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-white/72">
          Address
          <textarea
            value={details.address}
            onChange={(event) => updateField("address", event.target.value)}
            rows={4}
            className="rounded-[1.2rem] border border-white/10 bg-white/7 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/34 focus:border-[#ffd54a]"
            placeholder="House number, street, city, state, postal code"
          />
        </label>

        <label className="grid gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-white/72">
          Optional note
          <textarea
            value={details.note}
            onChange={(event) => updateField("note", event.target.value)}
            rows={3}
            className="rounded-[1.2rem] border border-white/10 bg-white/7 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/34 focus:border-[#ffd54a]"
            placeholder="Gift wrap, delivery timing, custom text, or anything else"
          />
        </label>
      </div>

      {formError ? (
        <p className="mt-4 rounded-[1.2rem] border border-[#7a3328] bg-[#2c1714] px-4 py-3 text-sm text-[#ffb1a7]">
          {formError}
        </p>
      ) : null}

      <p className="mt-4 text-sm leading-7 text-white/62">
        WhatsApp opens with the cart summary, pricing, and customer details already
        filled in.
      </p>

      <button
        type="submit"
        disabled={cartCount === 0}
        className="mt-5 inline-flex h-14 w-full items-center justify-center rounded-full bg-[#ffd54a] px-5 text-sm font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-[#ffdf73] disabled:cursor-not-allowed disabled:bg-[#8d8d8d]"
      >
        Place Order on WhatsApp
      </button>
    </form>
  );
}
