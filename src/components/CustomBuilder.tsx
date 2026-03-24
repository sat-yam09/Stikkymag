"use client";

import { useId, useState } from "react";
import { useCart } from "@/context/CartContext";
import { getCustomProductPrice } from "@/data/products";
import {
  ACCEPTED_FILE_LABEL,
  createPreviewReference,
  processImageUpload,
} from "@/lib/image";
import type { ProductShape, ProductType } from "@/lib/types";
import {
  TWO_ITEM_COMBO_PRICE,
  formatCurrency,
  getProductTypeLabel,
  getShapeLabel,
} from "@/lib/utils";
import { ProductPreview } from "./ProductPreview";

type BuilderState = {
  productType: ProductType;
  shape: ProductShape;
  image: string | null;
  fileName: string;
  sizeLabel: string;
  error: string | null;
};

const productOptions: { value: ProductType; label: string; note: string }[] = [
  {
    value: "keychain",
    label: "Keychain",
    note: "Circle finish only",
  },
  {
    value: "fridge-magnet",
    label: "Fridge Magnet",
    note: "Circle or square",
  },
];

const shapeOptions: { value: ProductShape; label: string; note: string }[] = [
  { value: "circle", label: "Circle", note: "Rounded edge" },
  { value: "square", label: "Square", note: "Sharp retail cut" },
];

const initialState: BuilderState = {
  productType: "keychain",
  shape: "circle",
  image: null,
  fileName: "",
  sizeLabel: "",
  error: null,
};

const builderHighlights = [
  "Upload stays on-device until checkout",
  "Live product mask updates instantly",
  "Pair pricing still works in cart",
];

export function CustomBuilder() {
  const [builder, setBuilder] = useState<BuilderState>(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputId = useId();
  const { addCustomProduct } = useCart();

  const currentPrice = getCustomProductPrice(builder.productType, builder.shape);
  const productLabel = getProductTypeLabel(builder.productType);
  const shapeLabel = getShapeLabel(builder.shape);

  function updateProductType(value: ProductType) {
    setBuilder((currentValue) => ({
      ...currentValue,
      productType: value,
      shape: value === "keychain" ? "circle" : currentValue.shape,
      error: null,
    }));
  }

  function updateShape(value: ProductShape) {
    setBuilder((currentValue) => ({
      ...currentValue,
      shape: currentValue.productType === "keychain" ? "circle" : value,
      error: null,
    }));
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsProcessing(true);

    try {
      const processed = await processImageUpload(file);

      setBuilder((currentValue) => ({
        ...currentValue,
        image: processed.dataUrl,
        fileName: processed.fileName,
        sizeLabel: processed.sizeLabel,
        error: null,
      }));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "We could not process that image.";

      setBuilder((currentValue) => ({
        ...currentValue,
        image: null,
        fileName: "",
        sizeLabel: "",
        error: message,
      }));
    } finally {
      setIsProcessing(false);
      event.target.value = "";
    }
  }

  function handleAddToCart() {
    if (!builder.image) {
      setBuilder((currentValue) => ({
        ...currentValue,
        error: "Upload a JPG or PNG image before adding a custom product.",
      }));
      return;
    }

    addCustomProduct({
      title: `Custom ${shapeLabel} ${productLabel}`,
      productType: builder.productType,
      shape: builder.shape,
      image: builder.image,
      previewReference: createPreviewReference(builder.fileName),
      fileName: builder.fileName,
      unitPrice: currentPrice,
      accent: "#1c1c1c",
    });

    setBuilder((currentValue) => ({
      ...currentValue,
      error: null,
    }));
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[0.54fr_0.46fr]">
      <div className="rounded-[2.2rem] border border-white/6 bg-[#111111] p-5 text-white shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#ffd54a] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-black">
            Build custom
          </span>
          <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/70">
            Product studio
          </span>
        </div>

        <h3 className="mt-5 font-display text-4xl uppercase tracking-[-0.05em] text-white">
          Upload artwork and make it order-ready fast.
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/72">
          Pick the product, choose the shape, upload your image, and add the finished
          mockup to cart without leaving this screen.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {builderHighlights.map((highlight) => (
            <div
              key={highlight}
              className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 text-sm leading-6 text-white/76"
            >
              {highlight}
            </div>
          ))}
        </div>

        <div className="mt-7 grid gap-6">
          <div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/52">
                Step 1
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ffd54a]">
                Choose product
              </p>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {productOptions.map((option) => {
                const isActive = builder.productType === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateProductType(option.value)}
                    className={`rounded-[1.6rem] border p-4 text-left transition-colors ${
                      isActive
                        ? "border-[#ffd54a] bg-[#ffd54a] text-black"
                        : "border-white/10 bg-white/6 text-white"
                    }`}
                  >
                    <span className="block text-base font-semibold">{option.label}</span>
                    <span
                      className={`mt-1 block text-sm ${
                        isActive ? "text-black/72" : "text-white/64"
                      }`}
                    >
                      {option.note}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/52">
                Step 2
              </p>
              {builder.productType === "keychain" ? (
                <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/72">
                  Square locked for keychains
                </span>
              ) : null}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {shapeOptions.map((option) => {
                const isDisabled =
                  builder.productType === "keychain" && option.value === "square";
                const isActive = builder.shape === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => updateShape(option.value)}
                    className={`rounded-[1.6rem] border p-4 text-left transition-colors ${
                      isDisabled
                        ? "cursor-not-allowed border-white/8 bg-white/[0.03] text-white/28"
                        : isActive
                          ? "border-[#ffd54a] bg-[#1e1e1e] text-white"
                          : "border-white/10 bg-white/6 text-white"
                    }`}
                  >
                    <span className="block text-base font-semibold">{option.label}</span>
                    <span className="mt-1 block text-sm text-white/62">{option.note}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/52">
                Step 3
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ffd54a]">
                Upload image
              </p>
            </div>

            <input
              id={fileInputId}
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleFileChange}
              className="hidden"
            />

            <label
              htmlFor={fileInputId}
              className="mt-3 flex min-h-52 cursor-pointer flex-col justify-between rounded-[1.9rem] border border-dashed border-white/16 bg-[linear-gradient(180deg,#1c1c1c,#151515)] p-5 transition-colors hover:border-[#ffd54a]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-[#ffd54a] text-2xl font-semibold text-black">
                  +
                </div>
                <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/72">
                  {isProcessing ? "Processing" : "JPG / PNG"}
                </span>
              </div>

              <div>
                <p className="text-xl font-semibold leading-8 text-white">
                  Drop in a photo, logo, or artwork for the live product mockup.
                </p>
                <p className="mt-2 text-sm leading-7 text-white/64">
                  {ACCEPTED_FILE_LABEL}. Oversized files are compressed before they hit
                  the cart.
                </p>
              </div>

              <div className="inline-flex w-fit rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-black">
                {isProcessing ? "Preparing preview" : "Choose file"}
              </div>
            </label>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/48">
                  Selected file
                </p>
                <p className="mt-2 text-sm leading-6 text-white">
                  {builder.fileName || "No file added yet"}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/48">
                  Compressed size
                </p>
                <p className="mt-2 text-sm leading-6 text-white">
                  {builder.sizeLabel || "Will appear after upload"}
                </p>
              </div>
            </div>

            {builder.error ? (
              <p className="mt-4 rounded-[1.4rem] border border-[#7a3328] bg-[#2c1714] px-4 py-3 text-sm text-[#ffb1a7]">
                {builder.error}
              </p>
            ) : null}
          </div>

          <div className="rounded-[1.8rem] border border-white/10 bg-white/6 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/48">
                  Ready to cart
                </p>
                <h4 className="mt-2 font-display text-3xl uppercase tracking-[-0.04em] text-white">
                  {shapeLabel} {productLabel}
                </h4>
                <p className="mt-2 text-sm leading-6 text-white/66">
                  {formatCurrency(currentPrice)} for 1 or {formatCurrency(TWO_ITEM_COMBO_PRICE)} for 2
                </p>
              </div>

              <div className="rounded-[1.4rem] bg-[#ffd54a] px-4 py-3 text-right text-black">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-black/70">
                  Current price
                </p>
                <p className="mt-1 text-3xl font-semibold">
                  {formatCurrency(currentPrice)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isProcessing}
              className="mt-5 inline-flex h-14 w-full items-center justify-center rounded-full bg-[#ffd54a] px-5 text-sm font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-[#ffdf73] disabled:cursor-not-allowed disabled:bg-[#8d8d8d]"
            >
              {isProcessing ? "Preparing preview" : "Add Custom Product"}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-[2.2rem] border border-[#e5e5e5] bg-white p-5 shadow-[0_24px_70px_rgba(17,17,17,0.08)] sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#6a6a6a]">
              Live preview
            </p>
            <h3 className="mt-3 font-display text-4xl uppercase tracking-[-0.05em] text-[#111111]">
              Your upload, shown like a finished product card.
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#555555]">
              This preview stage mirrors the product look before it gets added to cart,
              so the custom flow feels as direct as shopping a preset tile.
            </p>
          </div>
          <span className="inline-flex w-fit rounded-full bg-[#111111] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#ffd54a]">
            {productLabel}
          </span>
        </div>

        <div className="mt-6 rounded-[2rem] bg-[linear-gradient(180deg,#1a1a1a,#232323)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,#202020,#131313)] p-5">
            <ProductPreview
              image={builder.image}
              productType={builder.productType}
              shape={builder.shape}
            />
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.6rem] border border-[#ececec] bg-[#f7f7f7] p-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#6a6a6a]">
              Selected setup
            </p>
            <p className="mt-2 text-lg font-semibold text-[#111111]">
              {shapeLabel} {productLabel}
            </p>
          </div>
          <div className="rounded-[1.6rem] border border-[#ececec] bg-[#f7f7f7] p-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#6a6a6a]">
              Upload mode
            </p>
            <p className="mt-2 text-sm leading-6 text-[#525252]">
              Preview stays inside the browser. WhatsApp receives the order summary plus
              preview reference.
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-[1.8rem] border border-[#ececec] bg-[#fafafa] p-5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#6a6a6a]">
            Why this feels like an app
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.4rem] bg-white p-4 text-sm leading-6 text-[#535353] shadow-[0_10px_24px_rgba(17,17,17,0.04)]">
              Product-type buttons behave like category selectors.
            </div>
            <div className="rounded-[1.4rem] bg-white p-4 text-sm leading-6 text-[#535353] shadow-[0_10px_24px_rgba(17,17,17,0.04)]">
              Upload gets its own strong card instead of a weak form field.
            </div>
            <div className="rounded-[1.4rem] bg-[#111111] p-4 text-sm leading-6 text-white">
              Preview and cart price stay visible through the whole flow.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
