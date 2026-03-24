"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import type { CartItem, CheckoutDetails } from "@/lib/types";
import {
  createWhatsappUrl,
  buildWhatsappMessage,
  generateOrderId,
  IS_DEMO_WHATSAPP_NUMBER,
} from "@/lib/whatsapp";
import {
  formatCurrency,
  FREE_DELIVERY_THRESHOLD,
  getLineTotal,
  getKindLabel,
  getProductTypeLabel,
  getShapeLabel,
  TWO_ITEM_COMBO_PRICE,
} from "@/lib/utils";
import { CheckoutForm } from "./CheckoutForm";

function CartItemThumbnail({ item }: { item: CartItem }) {
  if (item.kind === "custom") {
    return (
      <div className="relative pt-4">
        {item.productType === "keychain" ? (
          <div className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 rounded-full border-[4px] border-[#cad1d4]" />
        ) : null}
        <div
          className={`relative h-24 w-24 overflow-hidden border border-white/70 bg-[linear-gradient(180deg,#ffffff,#f4efe7)] ${
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
      className="relative h-24 w-24 overflow-hidden rounded-[1.4rem] border border-white/70 bg-[linear-gradient(180deg,#f7f4ed,#ffffff)]"
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
    deliveryFee,
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
        className={`absolute inset-0 bg-[#09110f]/58 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[35rem] flex-col overflow-hidden border-l border-white/70 bg-[#fbf7f0] shadow-[0_0_100px_rgba(15,23,42,0.3)] transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#ece5da] bg-white/92 px-5 py-5 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#587468]">
              Cart
            </p>
            <h2 className="mt-2 font-display text-4xl tracking-[-0.05em] text-[#17231e]">
              Review order
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-full border border-[#d0d9d4] bg-white px-4 py-2 text-sm font-semibold text-[#173a33]"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-[#5d6863]">
              {itemCount === 0
                ? "No items yet."
                : `${itemCount} ${itemCount === 1 ? "item" : "items"} in cart`}
            </p>
            {items.length > 0 ? (
              <button
                type="button"
                onClick={clearCart}
                className="text-sm font-semibold text-[#8a4338] transition-colors hover:text-[#722f26]"
              >
                Clear cart
              </button>
            ) : null}
          </div>

          {items.length === 0 ? (
            <div className="mt-6 rounded-[2rem] border border-dashed border-[#cbd7d1] bg-white p-8 text-center">
              <p className="font-display text-3xl tracking-[-0.04em] text-[#17231e]">
                Your cart is empty
              </p>
              <p className="mt-3 text-sm leading-7 text-[#5d6863]">
                Add a pre-designed product or create a custom keepsake to continue.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[2rem] border border-[#ede6dc] bg-white p-4 shadow-[0_14px_40px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex gap-4">
                    <CartItemThumbnail item={item} />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-2xl tracking-[-0.04em] text-[#17231e]">
                            {item.title}
                          </h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="rounded-full bg-[#edf4ef] px-3 py-1 text-xs font-semibold text-[#36584d]">
                              {getProductTypeLabel(item.productType)}
                            </span>
                            <span className="rounded-full bg-[#f7efe6] px-3 py-1 text-xs font-semibold text-[#735d46]">
                              {getKindLabel(item.kind)}
                            </span>
                            <span className="rounded-full bg-[#eff3f5] px-3 py-1 text-xs font-semibold text-[#51606c]">
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

                      <p className="mt-4 text-sm leading-6 text-[#5e6964]">
                        Preview ref: {item.previewReference}
                      </p>
                      {item.fileName ? (
                        <p className="mt-1 text-sm leading-6 text-[#5e6964]">
                          File: {item.fileName}
                        </p>
                      ) : null}
                      <p className="mt-1 text-sm leading-6 text-[#5e6964]">
                        Pricing: {formatCurrency(item.unitPrice)} each or {formatCurrency(TWO_ITEM_COMBO_PRICE)} for 2
                      </p>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="inline-flex items-center rounded-full border border-[#d0d9d4] bg-[#fbfaf7] p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-9 w-9 rounded-full text-lg font-semibold text-[#173a33] disabled:text-[#a0a9a4]"
                          >
                            -
                          </button>
                          <span className="inline-flex min-w-10 items-center justify-center text-sm font-semibold text-[#173a33]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-9 w-9 rounded-full text-lg font-semibold text-[#173a33]"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-lg font-semibold text-[#163a33]">
                          {formatCurrency(getLineTotal(item.quantity, item.unitPrice))}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-6 rounded-[2rem] border border-[#ece6dc] bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#587468]">
              Summary
            </p>
            <div className="mt-4 flex items-center justify-between text-sm text-[#5d6863]">
              <span>List total</span>
              <span className="font-semibold text-[#17231e]">
                {formatCurrency(listSubtotal)}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-sm text-[#5d6863]">
              <span>Combo savings</span>
              <span className="font-semibold text-[#17231e]">
                {comboSavings > 0 ? `-${formatCurrency(comboSavings)}` : "Auto applied on 2 items"}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between text-sm text-[#5d6863]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#17231e]">{formatCurrency(subtotal)}</span>
            </div>

            <div className="mt-3 flex items-center justify-between text-sm text-[#5d6863]">
              <span>Delivery</span>
              <span className="font-semibold text-[#17231e]">
                {deliveryFee === 0 ? "Free" : formatCurrency(deliveryFee)}
              </span>
            </div>

            <div className="mt-4 rounded-[1.4rem] bg-[#f7f4ed] px-4 py-3 text-sm text-[#5b6762]">
              Free delivery unlocks at {formatCurrency(FREE_DELIVERY_THRESHOLD)}.
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#e8ece8] pt-4">
              <span className="font-display text-3xl tracking-[-0.04em] text-[#17231e]">
                Total
              </span>
              <span className="text-2xl font-semibold text-[#163a33]">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <CheckoutForm cartCount={itemCount} onPlaceOrder={handlePlaceOrder} />
          </div>

          <div className="mt-5 rounded-[2rem] border border-[#ece6dc] bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#587468]">
              Order note
            </p>
            <p className="mt-3 text-sm leading-7 text-[#5d6863]">
              Custom uploads stay private in-browser, so WhatsApp receives a preview
              reference and file name instead of a hosted image URL.
            </p>

            {IS_DEMO_WHATSAPP_NUMBER ? (
              <p className="mt-4 rounded-2xl border border-[#f0d9b6] bg-[#fff7ea] px-4 py-3 text-sm leading-6 text-[#8a5c18]">
                Set <code>NEXT_PUBLIC_WHATSAPP_NUMBER</code> to replace the demo
                recipient number before launch.
              </p>
            ) : null}

            {lastOrderId ? (
              <p className="mt-4 rounded-2xl border border-[#d2e2da] bg-[#eef7f2] px-4 py-3 text-sm leading-6 text-[#2b5a49]">
                Last generated order ID: {lastOrderId}
              </p>
            ) : null}
          </div>
        </div>
      </aside>
    </div>
  );
}
