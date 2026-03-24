import Image from "next/image";
import Link from "next/link";
import { InstallAppSection } from "@/components/InstallAppSection";
import { PageHero } from "@/components/PageHero";
import { designedProducts } from "@/data/products";
import { formatCurrency } from "@/lib/utils";

const featuredProducts = designedProducts.slice(0, 3);

const sectionCards = [
  {
    title: "Shop pre-designed",
    description:
      "Browse the ready-made keychain grid in a dedicated store page with cleaner product-first browsing.",
    href: "/shop",
    accent: "bg-white",
  },
  {
    title: "Build custom",
    description:
      "Open the custom studio on its own page, upload artwork, preview it live, and add it straight to cart.",
    href: "/custom",
    accent: "bg-[#ffd54a]",
  },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-4 pb-28 sm:px-6 lg:px-8">
      <PageHero
        eyebrow="Stikkymag"
        title="A cleaner mobile storefront for shopping or building custom keepsakes."
        description="The app flow now separates the main actions into real pages: shop pre-designed drops, open the custom builder in its own screen, and tap any product to view full details before adding it to cart."
        actions={
          <>
            <Link
              href="/shop"
              className="inline-flex h-14 items-center justify-center rounded-full bg-[#ffd54a] px-6 text-sm font-semibold uppercase tracking-[0.18em] text-black"
            >
              Open shop
            </Link>
            <Link
              href="/custom"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/14 bg-white/8 px-6 text-sm font-semibold uppercase tracking-[0.18em] text-white"
            >
              Open custom studio
            </Link>
          </>
        }
      />

      <section className="mt-4 grid gap-4 md:grid-cols-2">
        {sectionCards.map((sectionCard) => (
          <Link
            key={sectionCard.title}
            href={sectionCard.href}
            className={`rounded-[2.2rem] border border-[#e4e4e4] p-6 shadow-[0_20px_60px_rgba(17,17,17,0.05)] transition-transform duration-300 hover:-translate-y-1 ${sectionCard.accent}`}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#666666]">
              Open page
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase tracking-[-0.05em] text-[#111111]">
              {sectionCard.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#555555]">
              {sectionCard.description}
            </p>
            <span className="mt-6 inline-flex rounded-full bg-[#111111] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#ffd54a]">
              View page
            </span>
          </Link>
        ))}
      </section>

      <section className="mt-6 rounded-[2.3rem] border border-[#e5e5e5] bg-white p-5 shadow-[0_20px_60px_rgba(17,17,17,0.05)] sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#666666]">
              Featured drops
            </p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-[-0.05em] text-[#111111]">
              Tap a product to open its detail page.
            </h2>
          </div>

          <Link
            href="/shop"
            className="rounded-full bg-[#111111] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#ffd54a]"
          >
            Go to shop
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="overflow-hidden rounded-[1.8rem] border border-[#e6e6e6] bg-[#fafafa] transition-transform duration-300 hover:-translate-y-1"
            >
              <div
                className="p-3"
                style={{
                  background: `linear-gradient(180deg, ${product.accent} 0%, rgba(255,255,255,0.98) 100%)`,
                }}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-white/80">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </div>

              <div className="p-4">
                <p className="font-semibold text-[#111111]">{product.title}</p>
                <p className="mt-1 text-sm text-[#666666]">
                  {formatCurrency(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="install-app" className="mt-6">
        <InstallAppSection />
      </section>
    </main>
  );
}
