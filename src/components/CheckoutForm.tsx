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
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/60 bg-white/84 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#587468]">
            Checkout
          </p>
          <h3 className="mt-2 font-display text-3xl tracking-[-0.04em] text-[#17231e]">
            Delivery details
          </h3>
        </div>
        <span className="rounded-full bg-[#edf4ef] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#31554a]">
          WhatsApp
        </span>
      </div>

      <div className="mt-5 grid gap-4">
        <label className="grid gap-2 text-sm font-semibold text-[#243a34]">
          Name
          <input
            type="text"
            value={details.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="h-12 rounded-2xl border border-[#d4ddd8] bg-[#fbfaf7] px-4 text-sm text-[#17231e] outline-none transition-colors focus:border-[#163a33]"
            placeholder="Full name"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[#243a34]">
          Phone number
          <input
            type="tel"
            value={details.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="h-12 rounded-2xl border border-[#d4ddd8] bg-[#fbfaf7] px-4 text-sm text-[#17231e] outline-none transition-colors focus:border-[#163a33]"
            placeholder="+91 98765 43210"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[#243a34]">
          Address
          <textarea
            value={details.address}
            onChange={(event) => updateField("address", event.target.value)}
            rows={4}
            className="rounded-2xl border border-[#d4ddd8] bg-[#fbfaf7] px-4 py-3 text-sm text-[#17231e] outline-none transition-colors focus:border-[#163a33]"
            placeholder="House number, street, city, state, postal code"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-[#243a34]">
          Optional note
          <textarea
            value={details.note}
            onChange={(event) => updateField("note", event.target.value)}
            rows={3}
            className="rounded-2xl border border-[#d4ddd8] bg-[#fbfaf7] px-4 py-3 text-sm text-[#17231e] outline-none transition-colors focus:border-[#163a33]"
            placeholder="Gift wrap, delivery timing, custom text, or anything else"
          />
        </label>
      </div>

      {formError ? (
        <p className="mt-4 rounded-2xl border border-[#f3d2cf] bg-[#fff3f1] px-4 py-3 text-sm text-[#9b3d32]">
          {formError}
        </p>
      ) : null}

      <p className="mt-4 text-sm leading-7 text-[#5b6762]">
        Orders open in WhatsApp with the cart summary, pricing, and delivery details
        already filled in.
      </p>

      <button
        type="submit"
        disabled={cartCount === 0}
        className="mt-5 inline-flex h-14 w-full items-center justify-center rounded-full bg-[#163a33] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#22483f] disabled:cursor-not-allowed disabled:bg-[#a0b4ad]"
      >
        Place Order on WhatsApp
      </button>
    </form>
  );
}
