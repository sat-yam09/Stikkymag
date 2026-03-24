import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-7xl items-center px-4 py-8 pb-28 sm:px-6 lg:px-8">
      <section className="w-full rounded-[2.3rem] border border-[#e5e5e5] bg-white p-8 text-center shadow-[0_24px_70px_rgba(17,17,17,0.06)] sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#666666]">
          Not found
        </p>
        <h1 className="mt-4 font-display text-5xl uppercase tracking-[-0.06em] text-[#111111]">
          This page does not exist.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#565656] sm:text-base">
          The link may be broken, or the product may have been removed. Go back to the
          storefront and continue browsing from there.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-14 items-center justify-center rounded-full bg-[#111111] px-6 text-sm font-semibold uppercase tracking-[0.18em] text-white"
          >
            Go home
          </Link>
          <Link
            href="/shop"
            className="inline-flex h-14 items-center justify-center rounded-full border border-[#dddddd] bg-[#f7f7f7] px-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#111111]"
          >
            Open shop
          </Link>
        </div>
      </section>
    </main>
  );
}
