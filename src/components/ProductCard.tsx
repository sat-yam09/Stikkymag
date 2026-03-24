"use client";

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
    <article className="group overflow-hidden rounded-[2rem] border border-[#dfe7e2] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1">
      <div
        className="relative overflow-hidden border-b border-[#e6ece7] p-5"
        style={{
          background: `linear-gradient(180deg, ${product.accent} 0%, rgba(255,255,255,0.94) 100%)`,
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex rounded-full border border-white/70 bg-white/82 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#4d645c]">
            {product.badge}
          </span>
          <span className="inline-flex rounded-full bg-[#173a33] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white">
            2 for {formatCurrency(TWO_ITEM_COMBO_PRICE)}
          </span>
        </div>
        <div className="relative mt-4 h-64">
          <div
            className="h-full w-full bg-contain bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ backgroundImage: `url(${product.image})` }}
            aria-label={product.title}
          />
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#edf4ef] px-3 py-1 text-xs font-semibold text-[#35584d]">
            {getProductTypeLabel(product.productType)}
          </span>
          <span className="rounded-full bg-[#f7f2e9] px-3 py-1 text-xs font-semibold text-[#725c45]">
            {getShapeLabel(product.shape)}
          </span>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-[2rem] leading-none tracking-[-0.05em] text-[#16211d]">
              {product.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#5b6762]">
              {product.description}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#65726d]">
              Pricing
            </p>
            <p className="mt-2 text-3xl font-semibold text-[#163a33]">
              {formatCurrency(product.price)}
            </p>
            <p className="mt-1 text-sm text-[#6c6459]">Single item price</p>
          </div>

          <button
            type="button"
            onClick={() => addPreDesignedProduct(product)}
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#163a33] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#22483f]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
