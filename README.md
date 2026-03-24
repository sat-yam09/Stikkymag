# Stikkymag

A modern Next.js storefront for selling custom keychains and fridge magnets with:

- pre-designed product browsing
- a custom upload builder with live preview
- combo pricing at Rs 100 for 1 and Rs 180 for 2
- cart persistence
- WhatsApp-based checkout
- install-as-app support

## Tech Stack

- Next.js App Router
- React
- Tailwind CSS
- Client-side image processing

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run lint
npm run build
```

## Deploy

- No environment variable is required for WhatsApp checkout.
- The checkout recipient is hardcoded to `919824006191`.
- If your hosting provider previously had `NEXT_PUBLIC_WHATSAPP_NUMBER` set, delete it and redeploy so an old client build does not keep using the wrong number.

## WhatsApp Setup

Current WhatsApp checkout recipient:

```bash
919824006191
```
