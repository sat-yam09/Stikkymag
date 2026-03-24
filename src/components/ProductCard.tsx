"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { CatalogProduct } from "@/lib/types";
import {
  TWO_ITEM_COMBO_PRICE,
  formatCurrency,
  getProductTypeLabel,
  getShapeLabel,
} from "@/lib/utils";

type ProductCardProps = {
  product: CatalogProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addPreDesignedProduct } = useCart();

  return (
    <article className="group overflow-hidden rounded-[1.8rem] border border-[#e4e4e4] bg-white shadow-[0_16px_44px_rgba(17,17,17,0.06)] transition-transform duration-300 hover:-translate-y-1">
      <Link href={`/products/${product.id}`} className="block">
        <div
          className="relative overflow-hidden border-b border-[#ececec] p-3"
          style={{
            background: `linear-gradient(180deg, ${product.accent} 0%, rgba(255,255,255,0.94) 100%)`,
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex rounded-full border border-white/70 bg-white/88 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#505050]">
              {product.badge}
            </span>
            <span className="inline-flex rounded-full bg-[#111111] px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#ffd54a]">
              2 for {formatCurrency(TWO_ITEM_COMBO_PRICE)}
            </span>
          </div>

          <div className="relative mt-3 aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-white/45">
            <div
              className="h-full w-full bg-contain bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-[1.03]"
              style={{ backgroundImage: `url(${product.image})` }}
              aria-label={product.title}
            />
          </div>
        </div>

        <div className="p-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#111111] px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white">
              {getProductTypeLabel(product.productType)}
            </span>
            <span className="rounded-full bg-[#f3f3f3] px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#555555]">
              {getShapeLabel(product.shape)}
            </span>
          </div>

          <div className="mt-4">
            <h3 className="font-display text-[1.65rem] uppercase leading-none tracking-[-0.05em] text-[#111111]">
              {product.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#5d5d5d]">
              {product.description}
            </p>
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <div className="rounded-[1.4rem] bg-[#f7f7f7] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#666666]">
            Pricing
          </p>
          <div className="mt-2 flex items-end justify-between gap-3">
            <p className="text-3xl font-semibold text-[#111111]">
              {formatCurrency(product.price)}
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#666666]">
              Single
            </p>
          </div>
          <p className="mt-1 text-sm text-[#666666]">
            Pair offer {formatCurrency(TWO_ITEM_COMBO_PRICE)}
          </p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <Link
            href={`/products/${product.id}`}
            className="inline-flex h-12 items-center justify-center rounded-full border border-[#dfdfdf] bg-white px-4 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#f7f7f7]"
          >
            View details
          </Link>
          <button
            type="button"
            onClick={() => addPreDesignedProduct(product)}
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#111111] px-4 text-sm font-semibold text-[#ffd54a] transition-colors hover:bg-[#242424]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
