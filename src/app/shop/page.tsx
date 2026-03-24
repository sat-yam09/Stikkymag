import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { designedProducts } from "@/data/products";

export default function ShopPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-4 pb-28 sm:px-6 lg:px-8">
      <PageHero
        eyebrow="Shop"
        title="Pre-designed drops in a clean mobile shopping grid."
        description="This page is focused only on ready-made products, so browsing feels faster and more like a dedicated storefront screen."
        actions={
          <>
            <span className="inline-flex h-14 items-center justify-center rounded-full bg-[#ffd54a] px-6 text-sm font-semibold uppercase tracking-[0.18em] text-black">
              Rs 100 each
            </span>
            <span className="inline-flex h-14 items-center justify-center rounded-full border border-white/14 bg-white/8 px-6 text-sm font-semibold uppercase tracking-[0.18em] text-white">
              2 for Rs 180
            </span>
          </>
        }
      />

      <section className="mt-4 rounded-[2.2rem] border border-[#e5e5e5] bg-white p-5 shadow-[0_20px_60px_rgba(17,17,17,0.05)] sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#666666]">
              Product grid
            </p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-[-0.05em] text-[#111111]">
              All pre-designed products
            </h2>
          </div>

          <Link
            href="/custom"
            className="rounded-full border border-[#dddddd] bg-[#f7f7f7] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#111111]"
          >
            Need custom instead?
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {designedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
