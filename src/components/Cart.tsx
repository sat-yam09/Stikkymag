"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import type { CartItem, CheckoutDetails } from "@/lib/types";
import {
  buildWhatsappMessage,
  createWhatsappUrl,
  generateOrderId,
} from "@/lib/whatsapp";
import {
  TWO_ITEM_COMBO_PRICE,
  formatCurrency,
  getKindLabel,
  getLineTotal,
  getProductTypeLabel,
  getShapeLabel,
} from "@/lib/utils";
import { CheckoutForm } from "./CheckoutForm";

function CartItemThumbnail({ item }: { item: CartItem }) {
  if (item.kind === "custom") {
    return (
      <div className="relative pt-4">
        {item.productType === "keychain" ? (
          <div className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 rounded-full border-[4px] border-[#d6d8dd]" />
        ) : null}
        <div
          className={`relative h-24 w-24 overflow-hidden border border-white/60 bg-[linear-gradient(180deg,#fdfdfd,#ececec)] ${
            item.shape === "circle" ? "rounded-full" : "rounded-[1.4rem]"
          }`}
        >
          <div
            className="absolute inset-[14%] rounded-[inherit] bg-cover bg-center"
            style={{ backgroundImage: `url(${item.image})` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative h-24 w-24 overflow-hidden rounded-[1.4rem] border border-[#ececec] bg-[linear-gradient(180deg,#fcfcfc,#f0f0f0)]"
      style={{ backgroundColor: item.accent }}
    >
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat p-2"
        style={{ backgroundImage: `url(${item.image})` }}
      />
    </div>
  );
}

export function Cart() {
  const {
    items,
    isCartOpen,
    itemCount,
    listSubtotal,
    subtotal,
    comboSavings,
    total,
    closeCart,
    clearCart,
    removeItem,
    updateQuantity,
  } = useCart();
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (!isCartOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCart();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeCart, isCartOpen]);

  function handlePlaceOrder(details: CheckoutDetails) {
    const orderId = generateOrderId();
    const message = buildWhatsappMessage({
      orderId,
      items,
      checkout: details,
    });

    setLastOrderId(orderId);
    window.location.href = createWhatsappUrl(message);
  }

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isCartOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isCartOpen}
    >
      <button
        type="button"
        aria-label="Close cart overlay"
        onClick={closeCart}
        className={`absolute inset-0 bg-black/62 backdrop-blur-md transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[38rem] flex-col overflow-hidden border-l border-white/8 bg-[#f3f3f3] shadow-[0_0_120px_rgba(0,0,0,0.34)] transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="border-b border-white/8 bg-[#111111] px-5 py-5 text-white sm:px-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#ffd54a]">
                Cart
              </p>
              <h2 className="mt-2 font-display text-4xl uppercase tracking-[-0.05em] text-white">
                Review order
              </h2>
              <p className="mt-2 text-sm text-white/62">
                {itemCount === 0
                  ? "No items yet."
                  : `${itemCount} ${itemCount === 1 ? "item" : "items"} ready for checkout.`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 ? (
                <button
                  type="button"
                  onClick={clearCart}
                  className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-semibold text-white/76"
                >
                  Clear
                </button>
              ) : null}
              <button
                type="button"
                onClick={closeCart}
                className="rounded-full bg-[#ffd54a] px-4 py-2 text-sm font-semibold text-black"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
          {items.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-[#d7d7d7] bg-white p-8 text-center shadow-[0_14px_34px_rgba(17,17,17,0.05)]">
              <p className="font-display text-3xl uppercase tracking-[-0.04em] text-[#111111]">
                Your cart is empty
              </p>
              <p className="mt-3 text-sm leading-7 text-[#565656]">
                Add a pre-designed product or create a custom keychain or magnet to
                continue.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[2rem] border border-[#e5e5e5] bg-white p-4 shadow-[0_14px_34px_rgba(17,17,17,0.05)]"
                >
                  <div className="flex gap-4">
                    <CartItemThumbnail item={item} />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-[1.85rem] uppercase leading-none tracking-[-0.05em] text-[#111111]">
                            {item.title}
                          </h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="rounded-full bg-[#111111] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white">
                              {getProductTypeLabel(item.productType)}
                            </span>
                            <span className="rounded-full bg-[#ffd54a] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-black">
                              {getKindLabel(item.kind)}
                            </span>
                            <span className="rounded-full bg-[#f2f2f2] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#555555]">
                              {getShapeLabel(item.shape)}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-sm font-semibold text-[#8a4338]"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-4 grid gap-2 text-sm leading-6 text-[#5d5d5d]">
                        <p>Preview ref: {item.previewReference}</p>
                        {item.hostedImageUrl ? (
                          <p className="break-all">Hosted image: {item.hostedImageUrl}</p>
                        ) : null}
                        {item.fileName ? <p>File: {item.fileName}</p> : null}
                        <p>
                          Pricing: {formatCurrency(item.unitPrice)} each or{" "}
                          {formatCurrency(TWO_ITEM_COMBO_PRICE)} for 2
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="inline-flex items-center rounded-full border border-[#e1e1e1] bg-[#f7f7f7] p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-9 w-9 rounded-full text-lg font-semibold text-[#111111] disabled:text-[#b3b3b3]"
                          >
                            -
                          </button>
                          <span className="inline-flex min-w-10 items-center justify-center text-sm font-semibold text-[#111111]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-9 w-9 rounded-full text-lg font-semibold text-[#111111]"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#6a6a6a]">
                            Line total
                          </p>
                          <p className="mt-1 text-xl font-semibold text-[#111111]">
                            {formatCurrency(getLineTotal(item.quantity, item.unitPrice))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-6 rounded-[2rem] border border-[#e5e5e5] bg-white p-5 shadow-[0_14px_34px_rgba(17,17,17,0.05)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6a6a6a]">
                  Summary
                </p>
                <h3 className="mt-2 font-display text-3xl uppercase tracking-[-0.04em] text-[#111111]">
                  Cart total
                </h3>
              </div>
              <span className="rounded-full bg-[#111111] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white">
                2 for {formatCurrency(TWO_ITEM_COMBO_PRICE)}
              </span>
            </div>

            <div className="mt-5 grid gap-3 text-sm text-[#565656]">
              <div className="flex items-center justify-between">
                <span>List total</span>
                <span className="font-semibold text-[#111111]">
                  {formatCurrency(listSubtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Combo savings</span>
                <span className="font-semibold text-[#111111]">
                  {comboSavings > 0 ? `-${formatCurrency(comboSavings)}` : "Auto applied"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#111111]">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery</span>
                <span className="font-semibold text-[#111111]">Mentioned after order</span>
              </div>
            </div>

            <div className="mt-4 rounded-[1.4rem] bg-[#f7f7f7] px-4 py-3 text-sm text-[#5c5c5c]">
              Delivery charge will be mentioned after order confirmation.
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#ececec] pt-4">
              <span className="font-display text-3xl uppercase tracking-[-0.04em] text-[#111111]">
                Total
              </span>
              <span className="text-2xl font-semibold text-[#111111]">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <CheckoutForm cartCount={itemCount} onPlaceOrder={handlePlaceOrder} />
          </div>

          <div className="mt-5 rounded-[2rem] border border-[#e5e5e5] bg-white p-5 shadow-[0_14px_34px_rgba(17,17,17,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6a6a6a]">
              Order note
            </p>
            <p className="mt-3 text-sm leading-7 text-[#5d5d5d]">
              Custom uploads keep their preview inside the app, and WhatsApp gets a
              hosted image link plus the file name for the full artwork reference.
            </p>

            {lastOrderId ? (
              <p className="mt-4 rounded-[1.4rem] border border-[#d6d6d6] bg-[#f7f7f7] px-4 py-3 text-sm leading-6 text-[#444444]">
                Last generated order ID: {lastOrderId}
              </p>
            ) : null}
          </div>
        </div>
      </aside>
    </div>
  );
}
