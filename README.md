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

## WhatsApp Setup

Set the recipient number before launch:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=919999999999
```
