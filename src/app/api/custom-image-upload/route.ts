import { NextResponse } from "next/server";

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_UPLOAD_FOLDER =
  process.env.CLOUDINARY_UPLOAD_FOLDER || "stikkymag-custom-orders";

function isCloudinaryConfigured() {
  return Boolean(
    CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET,
  );
}

export async function POST(request: Request) {
  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      {
        error:
          "Custom image hosting is not configured yet. Add Cloudinary env vars before using hosted WhatsApp images.",
      },
      { status: 500 },
    );
  }

  const incomingFormData = await request.formData();
  const file = incomingFormData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Image file is required." }, { status: 400 });
  }

  const cloudinaryFormData = new FormData();
  cloudinaryFormData.append("file", file, file.name);
  cloudinaryFormData.append("folder", CLOUDINARY_UPLOAD_FOLDER);
  cloudinaryFormData.append("use_filename", "true");
  cloudinaryFormData.append("unique_filename", "true");
  cloudinaryFormData.append("overwrite", "false");

  const basicAuthToken = Buffer.from(
    `${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`,
  ).toString("base64");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuthToken}`,
      },
      body: cloudinaryFormData,
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | { error?: { message?: string } }
      | null;

    return NextResponse.json(
      {
        error:
          payload?.error?.message ||
          "Cloudinary rejected the custom image upload.",
      },
      { status: 500 },
    );
  }

  const payload = (await response.json()) as { secure_url?: string };

  if (!payload.secure_url) {
    return NextResponse.json(
      { error: "Cloudinary did not return a hosted image URL." },
      { status: 500 },
    );
  }

  return NextResponse.json({ imageUrl: payload.secure_url });
}
