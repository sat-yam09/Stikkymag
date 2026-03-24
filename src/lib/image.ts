"use client";

import type { ProcessedUpload } from "@/lib/types";

const MAX_DIMENSION = 1400;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"];

export const ACCEPTED_FILE_LABEL = "JPG or PNG up to 10 MB";

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("We could not read that image file."));
    image.src = src;
  });
}

export async function processImageUpload(file: File): Promise<ProcessedUpload> {
  if (!file) {
    throw new Error("Please choose an image before adding a custom item.");
  }

  if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
    throw new Error("Only JPG and PNG images are supported.");
  }

  if (file.size === 0) {
    throw new Error("The selected image is empty.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Please upload an image smaller than 10 MB.");
  }

  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await loadImage(objectUrl);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(image.width, image.height));
    const targetWidth = Math.max(1, Math.round(image.width * scale));
    const targetHeight = Math.max(1, Math.round(image.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Your browser could not prepare the preview canvas.");
    }

    const shouldUseJpeg = file.type === "image/jpeg" || file.size > 1.8 * 1024 * 1024;
    const outputType = shouldUseJpeg ? "image/jpeg" : "image/png";
    const quality = file.size > 1.8 * 1024 * 1024 ? 0.82 : 0.92;

    if (outputType === "image/jpeg") {
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, targetWidth, targetHeight);
    }

    context.drawImage(image, 0, 0, targetWidth, targetHeight);

    return {
      dataUrl: canvas.toDataURL(outputType, quality),
      fileName: file.name,
      sizeLabel: formatBytes(file.size),
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function createPreviewReference(fileName: string) {
  const safeName = fileName.replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/gi, "-");
  const stamp = Date.now().toString(36).toUpperCase();

  return `Preview-${safeName.slice(0, 16) || "upload"}-${stamp}`;
}

export async function uploadCustomImage(file: File) {
  const formData = new FormData();
  formData.append("file", file, file.name);

  const response = await fetch("/api/custom-image-upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | { error?: string }
      | null;

    throw new Error(
      payload?.error || "We could not upload the image for WhatsApp sharing.",
    );
  }

  const payload = (await response.json()) as { imageUrl: string };

  if (!payload.imageUrl) {
    throw new Error("Hosted image URL was missing from the upload response.");
  }

  return payload.imageUrl;
}
