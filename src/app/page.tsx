import { Cart } from "@/components/Cart";
import { CustomBuilder } from "@/components/CustomBuilder";
import { InstallAppSection } from "@/components/InstallAppSection";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { ProductPreview } from "@/components/ProductPreview";
import { SectionHeading } from "@/components/SectionHeading";
import { designedProducts } from "@/data/products";

const keychainProducts = designedProducts.filter(
  (product) => product.productType === "keychain",
);

const magnetProducts = designedProducts.filter(
  (product) => product.productType === "fridge-magnet",
);

const highlights = [
  "Circle keychains crafted for photos and initials",
  "Circle and square magnets for desks, fridges, and gifting",
  "WhatsApp-first ordering with customer details prefilled",
];

const appSections = [
  {
    title: "Pre-designed store",
    description:
      "Browse ready-made keychains like a storefront app home tab.",
    tone: "bg-white/88",
    href: "#predesigned-section",
    cta: "Open presets",
  },
  {
    title: "Custom studio",
    description:
      "Upload artwork, select product type, and preview your design before checkout.",
    tone: "bg-[#f7f2e9]/94",
    href: "#custom-builder",
    cta: "Build custom",
  },
  {
    title: "Install as app",
    description:
      "Add the storefront to the home screen for an app-like ordering experience.",
    tone: "bg-[#edf4ef]/94",
    href: "#install-app",
    cta: "Install flow",
  },
];

const heroStats = [
  {
    label: "Single item",
    value: "Rs 100",
  },
  {
    label: "Combo offer",
    value: "2 for Rs 180",
  },
  {
    label: "Order flow",
    value: "WhatsApp cart",
  },
];

const steps = [
  {
    title: "Pick a ready-made design",
    description:
      "Browse polished presets for quick gifting, party favors, and boutique-style add-ons.",
  },
  {
    title: "Or build a custom piece",
    description:
      "Upload a JPG or PNG, choose the shape, and preview the product instantly before adding it to the cart.",
  },
  {
    title: "Checkout on WhatsApp",
    description:
      "Review the cart, add delivery details, and send the full order summary through a single WhatsApp message.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(219,233,226,0.95),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(255,227,194,0.75),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.58),rgba(255,255,255,0))]" />
      <Navbar />

      <main className="relative">
        <section className="border-b border-[#dfe6e1] bg-[#163a33] text-white">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3 text-xs font-semibold uppercase tracking-[0.26em] sm:px-8 lg:px-10">
            <span>Merch-store workflow</span>
            <span>Rs 100 for 1</span>
            <span>Rs 180 for 2</span>
            <span>WhatsApp checkout</span>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 pb-20 pt-10 sm:px-8 lg:px-10 lg:pb-24 lg:pt-16">
          <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
            <div className="rounded-[2.8rem] border border-white/70 bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.09)] sm:p-10">
              <span className="inline-flex items-center rounded-full border border-[#d4ddd8] bg-[#edf4ef] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#49695f]">
                App-like merch store
              </span>
              <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.98] tracking-[-0.06em] text-[#16211c] sm:text-6xl lg:text-7xl">
                Custom keychains and magnets built like a real shopping app.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#58645f] sm:text-xl">
                Keep the current warm palette, but shift the whole experience into a
                stronger ecommerce layout with pre-designed drops, a custom studio,
                combo pricing, and one-tap WhatsApp checkout.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#predesigned-section"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-[#163a33] px-7 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#21473f]"
                >
                  Shop pre-designed
                </a>
                <a
                  href="#custom-builder"
                  className="inline-flex h-14 items-center justify-center rounded-full border border-[#cbd7d1] bg-white px-7 text-sm font-semibold text-[#163a33] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Open custom studio
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.8rem] border border-[#e2e9e4] bg-[#fbfaf7] p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#63716c]">
                      {stat.label}
                    </p>
                    <p className="mt-3 font-display text-3xl tracking-[-0.05em] text-[#16211d]">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-[1.55rem] border border-[#e2e9e4] bg-[#f7f4ed] p-4 text-sm leading-6 text-[#51615b]"
                  >
                    {highlight}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative overflow-hidden rounded-[2.8rem] bg-[#163a33] p-7 text-white shadow-[0_30px_90px_rgba(15,23,42,0.16)] sm:col-span-2 sm:p-8">
                <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-white/8 blur-3xl" />
                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                      Custom studio preview
                    </p>
                    <h2 className="mt-2 font-display text-4xl tracking-[-0.05em] text-white">
                      See the product before it hits the cart.
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-white/78">
                      Customers can move from discovery to preview without leaving the
                      same app flow.
                    </p>
                  </div>

                  <div className="flex items-center justify-center">
                    <ProductPreview
                      image="/products/memory-photo.svg"
                      productType="keychain"
                      shape="circle"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/70 bg-[#f8f3eb]/96 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#7a674f]">
                  Store structure
                </p>
                <p className="mt-3 font-display text-3xl tracking-[-0.04em] text-[#2d241a]">
                  Pre-designed drops
                </p>
                <p className="mt-3 text-sm leading-7 text-[#6e655a]">
                  A bold preset grid for your latest ready-made keychain drops.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#4d6d62]">
                  Pricing engine
                </p>
                <p className="mt-3 font-display text-3xl tracking-[-0.04em] text-[#13211d]">
                  Auto combo pricing
                </p>
                <p className="mt-3 text-sm leading-7 text-[#55635e]">
                  The cart now calculates Rs 100 for one item and Rs 180 for every pair automatically.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-2 w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-4 md:grid-cols-3">
            {appSections.map((card, index) => (
              <div
                key={card.title}
                className={`rounded-[2.3rem] border border-white/70 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.07)] ${card.tone}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#163a33] font-display text-2xl text-white">
                  0{index + 1}
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#5a7469]">
                  App section
                </p>
                <h3 className="mt-3 font-display text-4xl tracking-[-0.05em] text-[#17231d]">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#5c6763]">{card.description}</p>
                <a
                  href={card.href}
                  className="mt-6 inline-flex rounded-full border border-[#d3ddd7] bg-white/86 px-4 py-2 text-sm font-semibold text-[#163a33] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {card.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section
          id="predesigned-section"
          className="mx-auto mt-28 w-full max-w-7xl px-5 sm:px-8 lg:px-10"
        >
          <div className="rounded-[2.8rem] border border-white/70 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
            <SectionHeading
              eyebrow="Pre-designed section"
              title="Preset drops arranged like a storefront collection."
              description="This is the quick-shop area of the app: your real ready-made keychain photos, bold cards, and instant add-to-cart behavior with combo pricing."
            />

            <div className="mt-12 rounded-[2.2rem] border border-[#ece5da] bg-[#f8f3eb] p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="font-display text-4xl tracking-[-0.05em] text-[#18231d]">
                    Keychains
                  </h3>
                  <p className="mt-2 text-sm text-[#5c6763]">
                    Circle-only ready-made keychains based on your current featured
                    drops.
                  </p>
                </div>
                <span className="inline-flex rounded-full border border-[#d6dfda] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#537165]">
                  Latest drop
                </span>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {keychainProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {magnetProducts.length > 0 ? (
              <div className="mt-8 rounded-[2.2rem] border border-[#e4ebe6] bg-[#edf4ef] p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="font-display text-4xl tracking-[-0.05em] text-[#18231d]">
                      Fridge Magnets
                    </h3>
                    <p className="mt-2 text-sm text-[#5c6763]">
                      Mix circle and square formats for desks, refrigerators, shelves, and
                      gift bundles.
                    </p>
                  </div>
                  <span className="inline-flex rounded-full border border-[#d6dfda] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#537165]">
                    Circle + square
                  </span>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {magnetProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section id="custom-builder" className="mx-auto mt-28 w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="rounded-[2.8rem] border border-white/70 bg-[linear-gradient(180deg,#163a33_0%,#254d44_100%)] p-6 shadow-[0_24px_90px_rgba(15,23,42,0.16)] sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[0.34fr_0.66fr]">
              <div className="rounded-[2.2rem] border border-white/12 bg-white/6 p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                  Custom section
                </p>
                <h2 className="mt-4 font-display text-4xl tracking-[-0.05em] text-white">
                  Build the product inside a dedicated studio.
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/80">
                  This area acts like a creator workspace: choose the product, upload
                  artwork, preview it live, then send it straight to the cart.
                </p>

                <div className="mt-8 grid gap-3">
                  <div className="rounded-[1.6rem] border border-white/12 bg-white/6 p-4 text-sm leading-7 text-white/78">
                    Step 1: choose keychain or magnet.
                  </div>
                  <div className="rounded-[1.6rem] border border-white/12 bg-white/6 p-4 text-sm leading-7 text-white/78">
                    Step 2: upload artwork and switch shape.
                  </div>
                  <div className="rounded-[1.6rem] border border-white/12 bg-white/6 p-4 text-sm leading-7 text-white/78">
                    Step 3: add to cart with Rs 100 single and Rs 180 pair pricing.
                  </div>
                </div>
              </div>

              <div>
                <CustomBuilder />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-28 w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Install section"
            title="Let customers keep the storefront like an app."
            description="This section explains installation clearly and shows an install button when the browser exposes the app install prompt."
          />
          <div className="mt-10">
            <InstallAppSection />
          </div>
        </section>

        <section className="mx-auto mt-28 w-full max-w-7xl px-5 pb-28 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="How it works"
            title="A simple flow built for mobile-first ordering."
            description="Every interaction is designed to stay light, responsive, and easy to complete on a phone."
            align="center"
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ecf4ef] font-display text-2xl text-[#24463e]">
                  0{index + 1}
                </div>
                <h3 className="mt-5 font-display text-3xl tracking-[-0.04em] text-[#18231d]">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#5d6864]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Cart />
    </div>
  );
}
