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
    note: "Circle only",
  },
  {
    value: "fridge-magnet",
    label: "Fridge Magnet",
    note: "Circle or square",
  },
];

const shapeOptions: { value: ProductShape; label: string }[] = [
  { value: "circle", label: "Circle" },
  { value: "square", label: "Square" },
];

const initialState: BuilderState = {
  productType: "keychain",
  shape: "circle",
  image: null,
  fileName: "",
  sizeLabel: "",
  error: null,
};

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
      accent: "#e5efe8",
    });

    setBuilder((currentValue) => ({
      ...currentValue,
      error: null,
    }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      <div className="rounded-[2.25rem] border border-white/70 bg-white/82 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="grid gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#587468]">
              Builder setup
            </p>
            <h3 className="mt-3 font-display text-4xl tracking-[-0.05em] text-[#16211d]">
              Create a custom order
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#5a6661]">
              Images stay on the device, preview updates instantly, and the cart stores
              the upload reference for WhatsApp checkout.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-[#243a34]">Product type</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {productOptions.map((option) => {
                const isActive = builder.productType === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateProductType(option.value)}
                    className={`rounded-[1.6rem] border px-4 py-4 text-left transition-colors ${
                      isActive
                        ? "border-[#163a33] bg-[#edf4ef] text-[#163a33]"
                        : "border-[#d8e0db] bg-[#fbfaf7] text-[#4f5f59]"
                    }`}
                  >
                    <span className="block font-semibold">{option.label}</span>
                    <span className="mt-1 block text-sm opacity-80">{option.note}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-[#243a34]">Shape</p>
              {builder.productType === "keychain" ? (
                <span className="rounded-full bg-[#f7efe6] px-3 py-1 text-xs font-semibold text-[#705f4d]">
                  Square disabled for keychains
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
                    className={`rounded-[1.6rem] border px-4 py-4 text-left transition-colors ${
                      isDisabled
                        ? "cursor-not-allowed border-[#ece7df] bg-[#f8f5ef] text-[#9d9488]"
                        : isActive
                          ? "border-[#163a33] bg-[#edf4ef] text-[#163a33]"
                          : "border-[#d8e0db] bg-[#fbfaf7] text-[#4f5f59]"
                    }`}
                  >
                    <span className="block font-semibold">{option.label}</span>
                    <span className="mt-1 block text-sm opacity-80">
                      {option.value === "circle" ? "Soft edge finish" : "Modern square cut"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-[#243a34]">Upload image</p>
            <input
              id={fileInputId}
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor={fileInputId}
              className="mt-3 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-[1.8rem] border border-dashed border-[#c8d5cf] bg-[linear-gradient(180deg,#fbfaf7,#f3efe7)] px-6 py-8 text-center transition-colors hover:border-[#163a33] hover:bg-[linear-gradient(180deg,#ffffff,#f3efe7)]"
            >
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#49695f] shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                {isProcessing ? "Processing image" : "Choose file"}
              </span>
              <span className="mt-4 max-w-sm text-base font-semibold text-[#24312d]">
                Upload a photo, logo, or artwork for a live mockup preview.
              </span>
              <span className="mt-2 text-sm text-[#65706c]">{ACCEPTED_FILE_LABEL}</span>
              <span className="mt-2 text-xs uppercase tracking-[0.24em] text-[#7e7568]">
                Large images are compressed automatically
              </span>
            </label>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {builder.fileName ? (
                <span className="rounded-full bg-[#edf4ef] px-3 py-2 text-sm font-semibold text-[#34564b]">
                  {builder.fileName}
                </span>
              ) : null}
              {builder.sizeLabel ? (
                <span className="rounded-full bg-[#f7efe6] px-3 py-2 text-sm font-semibold text-[#715b47]">
                  {builder.sizeLabel}
                </span>
              ) : null}
            </div>

            {builder.error ? (
              <p className="mt-4 rounded-2xl border border-[#f3d2cf] bg-[#fff3f1] px-4 py-3 text-sm text-[#9b3d32]">
                {builder.error}
              </p>
            ) : null}
          </div>

          <div className="rounded-[1.8rem] border border-[#dde5df] bg-[#f9f7f2] p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#597368]">
                  Current configuration
                </p>
                <h4 className="mt-2 font-display text-3xl tracking-[-0.05em] text-[#16211d]">
                  {shapeLabel} {productLabel}
                </h4>
                <p className="mt-2 text-sm text-[#6d6458]">
                  {formatCurrency(currentPrice)} for 1 or {formatCurrency(TWO_ITEM_COMBO_PRICE)} for 2
                </p>
              </div>
              <p className="text-2xl font-semibold text-[#163a33]">
                {formatCurrency(currentPrice)}
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isProcessing}
              className="mt-5 inline-flex h-14 w-full items-center justify-center rounded-full bg-[#163a33] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#21473f] disabled:cursor-not-allowed disabled:bg-[#8ca69d]"
            >
              {isProcessing ? "Preparing preview..." : "Add Custom Product"}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-[2.25rem] border border-white/70 bg-[linear-gradient(180deg,#f7f3eb,#ffffff)] p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#587468]">
          Live preview
        </p>
        <div className="mt-3 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-4xl tracking-[-0.05em] text-[#16211d]">
              Product mockup
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#5a6661]">
              The image is framed inside the chosen product shape to mimic the final
              look before checkout.
            </p>
          </div>
          <div className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#24463d] shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            {productLabel}
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] border border-white/70 bg-white/86 p-4 shadow-[0_14px_50px_rgba(15,23,42,0.06)] sm:p-6">
          <ProductPreview
            image={builder.image}
            productType={builder.productType}
            shape={builder.shape}
          />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.6rem] bg-white/82 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5f7a70]">
              Selected shape
            </p>
            <p className="mt-2 font-display text-3xl tracking-[-0.04em] text-[#16211d]">
              {shapeLabel}
            </p>
          </div>
          <div className="rounded-[1.6rem] bg-white/82 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5f7a70]">
              Notes
            </p>
            <p className="mt-2 text-sm leading-7 text-[#596560]">
              Uploads use an on-device preview reference in WhatsApp because no public
              image hosting is required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
