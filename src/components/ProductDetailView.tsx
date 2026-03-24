"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { CatalogProduct } from "@/lib/types";
import {
  TWO_ITEM_COMBO_PRICE,
  formatCurrency,
  getProductTypeLabel,
  getShapeLabel,
} from "@/lib/utils";

type ProductDetailViewProps = {
  product: CatalogProduct;
  relatedProducts: CatalogProduct[];
};

export function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const { addPreDesignedProduct } = useCart();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-4 pb-28 sm:px-6 lg:px-8">
      <div className="mb-4">
        <Link
          href="/shop"
          className="inline-flex rounded-full border border-[#dedede] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#555555]"
        >
          Back to shop
        </Link>
      </div>

      <section className="grid gap-4 lg:grid-cols-[0.98fr_1.02fr]">
        <div
          className="rounded-[2.3rem] border border-[#e5e5e5] p-4 shadow-[0_22px_60px_rgba(17,17,17,0.06)]"
          style={{
            background: `linear-gradient(180deg, ${product.accent} 0%, rgba(255,255,255,0.98) 100%)`,
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-white/70 bg-white/88 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#555555]">
              {product.badge}
            </span>
            <span className="rounded-full bg-[#111111] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#ffd54a]">
              2 for {formatCurrency(TWO_ITEM_COMBO_PRICE)}
            </span>
          </div>

          <div className="relative mt-4 aspect-square overflow-hidden rounded-[2rem] bg-white/78">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-4"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[2.3rem] border border-[#e5e5e5] bg-white p-6 shadow-[0_22px_60px_rgba(17,17,17,0.06)] sm:p-7">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#111111] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white">
                {getProductTypeLabel(product.productType)}
              </span>
              <span className="rounded-full bg-[#f3f3f3] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#555555]">
                {getShapeLabel(product.shape)}
              </span>
            </div>

            <h1 className="mt-5 font-display text-4xl uppercase tracking-[-0.06em] text-[#111111] sm:text-5xl">
              {product.title}
            </h1>
            <p className="mt-4 text-base leading-8 text-[#565656]">
              {product.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.6rem] bg-[#f7f7f7] p-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#666666]">
                  Single price
                </p>
                <p className="mt-2 text-3xl font-semibold text-[#111111]">
                  {formatCurrency(product.price)}
                </p>
              </div>
              <div className="rounded-[1.6rem] bg-[#111111] p-4 text-white">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#ffd54a]">
                  Pair offer
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  {formatCurrency(TWO_ITEM_COMBO_PRICE)}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => addPreDesignedProduct(product)}
                className="inline-flex h-14 items-center justify-center rounded-full bg-[#111111] px-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#ffd54a] transition-colors hover:bg-[#242424]"
              >
                Add to Cart
              </button>
              <Link
                href="/shop"
                className="inline-flex h-14 items-center justify-center rounded-full border border-[#dfdfdf] bg-[#f7f7f7] px-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#111111]"
              >
                Continue shopping
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.8rem] border border-[#e5e5e5] bg-white p-4 shadow-[0_16px_44px_rgba(17,17,17,0.05)]">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#666666]">
                Finish
              </p>
              <p className="mt-2 text-sm leading-7 text-[#565656]">
                Glossy printed face with a clean, compact acrylic look.
              </p>
            </div>
            <div className="rounded-[1.8rem] border border-[#e5e5e5] bg-white p-4 shadow-[0_16px_44px_rgba(17,17,17,0.05)]">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#666666]">
                Ordering
              </p>
              <p className="mt-2 text-sm leading-7 text-[#565656]">
                Add to cart here, then finish the full order over WhatsApp.
              </p>
            </div>
            <div className="rounded-[1.8rem] border border-[#e5e5e5] bg-white p-4 shadow-[0_16px_44px_rgba(17,17,17,0.05)]">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#666666]">
                Mobile flow
              </p>
              <p className="mt-2 text-sm leading-7 text-[#565656]">
                Built for phone-first browsing, product selection, and checkout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="mt-6 rounded-[2.3rem] border border-[#e5e5e5] bg-white p-5 shadow-[0_20px_60px_rgba(17,17,17,0.05)] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#666666]">
                More drops
              </p>
              <h2 className="mt-2 font-display text-3xl uppercase tracking-[-0.05em] text-[#111111]">
                Related products
              </h2>
            </div>
            <Link
              href="/shop"
              className="rounded-full bg-[#111111] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#ffd54a]"
            >
              View all
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/products/${relatedProduct.id}`}
                className="overflow-hidden rounded-[1.8rem] border border-[#e6e6e6] bg-[#fafafa] transition-transform duration-300 hover:-translate-y-1"
              >
                <div
                  className="p-3"
                  style={{
                    background: `linear-gradient(180deg, ${relatedProduct.accent} 0%, rgba(255,255,255,0.98) 100%)`,
                  }}
                >
                  <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-white/78">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-[#111111]">{relatedProduct.title}</p>
                  <p className="mt-1 text-sm text-[#666666]">
                    {formatCurrency(relatedProduct.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
