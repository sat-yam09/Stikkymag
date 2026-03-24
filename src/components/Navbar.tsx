"use client";

import { useCart } from "@/context/CartContext";

export function Navbar() {
  const { itemCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-[#dfe6e1] bg-[#f7f3ec]/92 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#173a33] font-display text-lg font-semibold text-white shadow-[0_12px_30px_rgba(22,58,51,0.22)]">
            K
          </div>
          <div>
            <p className="font-display text-2xl tracking-[-0.06em] text-[#16211d]">
              Stikkymag
            </p>
            <p className="text-xs uppercase tracking-[0.28em] text-[#61706a]">
              Keychains and magnets
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-3 text-sm font-semibold text-[#4c5d57] md:flex">
          <a
            href="#predesigned-section"
            className="rounded-full border border-[#d0d9d4] bg-white/84 px-4 py-2 transition-colors hover:text-[#163a33]"
          >
            Pre-designed
          </a>
          <a
            href="#custom-builder"
            className="rounded-full border border-[#d0d9d4] bg-white/84 px-4 py-2 transition-colors hover:text-[#163a33]"
          >
            Custom
          </a>
          <a
            href="#install-app"
            className="rounded-full border border-[#d0d9d4] bg-white/84 px-4 py-2 transition-colors hover:text-[#163a33]"
          >
            Install App
          </a>
        </div>

        <button
          type="button"
          onClick={openCart}
          className="inline-flex items-center gap-3 rounded-full border border-[#d0d9d4] bg-white/88 px-4 py-2.5 text-sm font-semibold text-[#173a33] shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-0.5"
        >
          <span>Cart</span>
          <span className="inline-flex min-w-7 items-center justify-center rounded-full bg-[#173a33] px-2 py-1 text-xs text-white">
            {itemCount}
          </span>
        </button>
      </div>
    </header>
  );
}
