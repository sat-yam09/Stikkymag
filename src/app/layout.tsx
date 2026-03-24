import type { Metadata, Viewport } from "next";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stikkymag | Custom Keychains & Fridge Magnets",
  description:
    "A premium storefront for pre-designed and custom keychains and fridge magnets with WhatsApp-based checkout.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Stikkymag",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#163a33",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-background text-foreground antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
