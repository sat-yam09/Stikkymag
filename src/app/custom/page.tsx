import Link from "next/link";
import { CustomBuilder } from "@/components/CustomBuilder";
import { PageHero } from "@/components/PageHero";

export default function CustomPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-4 pb-28 sm:px-6 lg:px-8">
      <PageHero
        eyebrow="Custom builder"
        title="A separate custom studio page for upload, preview, and ordering."
        description="This screen focuses only on the builder workflow so the mobile experience feels simpler: product type, shape, upload, preview, and cart all stay in one clean place."
        actions={
          <>
            <span className="inline-flex h-14 items-center justify-center rounded-full bg-[#ffd54a] px-6 text-sm font-semibold uppercase tracking-[0.18em] text-black">
              JPG and PNG
            </span>
            <Link
              href="/shop"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/14 bg-white/8 px-6 text-sm font-semibold uppercase tracking-[0.18em] text-white"
            >
              Browse products
            </Link>
          </>
        }
      />

      <section className="mt-4">
        <CustomBuilder />
      </section>
    </main>
  );
}
