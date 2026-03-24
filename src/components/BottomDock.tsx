"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const dockLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Custom", href: "/custom" },
];

export function BottomDock() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  function isLinkActive(href: string) {
    if (href === "/shop" && pathname.startsWith("/products/")) {
      return true;
    }

    return pathname === href;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-4 md:hidden">
      <div className="pointer-events-auto mx-auto flex max-w-md items-center justify-between rounded-[1.8rem] border border-white/10 bg-[#111111]/96 px-3 py-3 text-white shadow-[0_24px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl">
        {dockLinks.map((link) => {
          const isActive = isLinkActive(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`inline-flex min-w-0 flex-1 items-center justify-center rounded-[1.2rem] px-2 py-3 text-xs font-semibold uppercase tracking-[0.2em] ${
                isActive
                  ? "bg-[#ffd54a] text-black"
                  : "text-white/74 hover:bg-white/8 hover:text-[#ffd54a]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={openCart}
          className="inline-flex items-center gap-2 rounded-[1.2rem] bg-[#ffd54a] px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black"
        >
          Cart
          <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-black px-1.5 py-0.5 text-[0.68rem] text-white">
            {itemCount}
          </span>
        </button>
      </div>
    </div>
  );
}
