"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Custom", href: "/custom" },
];

export function Navbar() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  function isLinkActive(href: string) {
    if (href === "/shop" && pathname.startsWith("/products/")) {
      return true;
    }

    return pathname === href;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#111111]/96 text-white backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
              <Image
                src="/stikkymag-logo.svg"
                alt="Stikkymag logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </div>
            <div>
              <p className="font-display text-[1.85rem] uppercase tracking-[-0.06em] text-white">
                Stikkymag
              </p>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/58">
                Mobile-first merch app
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={openCart}
            className="inline-flex items-center gap-3 rounded-full bg-[#ffd54a] px-4 py-2.5 text-sm font-semibold text-black shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span>Cart</span>
            <span className="inline-flex min-w-7 items-center justify-center rounded-full bg-black px-2 py-1 text-xs text-white">
              {itemCount}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden min-w-0 flex-1 items-center gap-3 rounded-[1.6rem] border border-white/10 bg-white/6 px-4 py-3 md:flex">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffd54a]">
              App mode
            </span>
            <p className="truncate text-sm text-white/68">
              Separate pages for shopping, custom building, and product detail views.
            </p>
          </div>

          <div className="hidden items-center gap-2 text-sm font-semibold text-white/80 md:flex">
            {primaryLinks.map((link) => {
              const isActive = isLinkActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 transition-colors ${
                    isActive
                      ? "bg-[#ffd54a] text-black"
                      : "border border-white/14 bg-white/8 hover:bg-[#ffd54a] hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/#install-app"
              className="rounded-full border border-white/14 bg-white/8 px-4 py-2 transition-colors hover:bg-[#ffd54a] hover:text-black"
            >
              Install App
            </Link>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 md:hidden">
          {primaryLinks.map((link) => {
            const isActive = isLinkActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
                  isActive
                    ? "bg-[#ffd54a] text-black"
                    : "border border-white/12 bg-white/8 text-white/78"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/#install-app"
            className="shrink-0 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/78"
          >
            Install
          </Link>
        </div>
      </div>
    </header>
  );
}
