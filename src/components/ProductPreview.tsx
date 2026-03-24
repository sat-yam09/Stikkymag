import type { ProductShape, ProductType } from "@/lib/types";

type ProductPreviewProps = {
  image: string | null;
  productType: ProductType;
  shape: ProductShape;
  compact?: boolean;
};

export function ProductPreview({
  image,
  productType,
  shape,
  compact = false,
}: ProductPreviewProps) {
  const frameSize = compact ? "h-24 w-24" : "h-[19rem] w-[19rem] sm:h-[22rem] sm:w-[22rem]";
  const artInset = compact ? "inset-[14%]" : "inset-[12%]";
  const frameRadius = shape === "circle" ? "rounded-full" : "rounded-[2rem]";
  const artRadius = shape === "circle" ? "rounded-full" : "rounded-[1.4rem]";
  const shadowClass =
    productType === "keychain"
      ? "shadow-[0_26px_70px_rgba(15,23,42,0.16)]"
      : "shadow-[0_26px_70px_rgba(15,23,42,0.1)]";

  return (
    <div className={`relative flex items-center justify-center ${compact ? "pt-5" : "pt-8"}`}>
      {productType === "keychain" ? (
        <>
          <div className="absolute left-1/2 top-0 h-12 w-12 -translate-x-1/2 rounded-full border-[7px] border-[#cad1d4] bg-transparent shadow-[inset_0_0_0_2px_rgba(255,255,255,0.7)]" />
          <div className="absolute left-1/2 top-10 h-7 w-6 -translate-x-1/2 rounded-b-2xl bg-[#e7ecef]" />
        </>
      ) : null}

      <div className="absolute inset-x-14 bottom-2 h-5 rounded-full bg-[#1f2937]/12 blur-2xl" />

      <div
        className={`relative overflow-hidden border border-white/80 bg-[linear-gradient(180deg,#ffffff,#f7f4ee)] ${frameRadius} ${frameSize} ${shadowClass}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_35%),linear-gradient(145deg,rgba(255,255,255,0.5),rgba(15,23,42,0.05))]" />

        <div className={`absolute ${artInset} overflow-hidden border border-white/60 bg-[#eef1ee] ${artRadius}`}>
          {image ? (
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(145deg,#edf4ef,#f7efe6)] px-8 text-center text-sm font-semibold uppercase tracking-[0.28em] text-[#5f746c]">
              Upload image
            </div>
          )}
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.86),transparent_42%,rgba(15,23,42,0.05))]" />
      </div>
    </div>
  );
}
