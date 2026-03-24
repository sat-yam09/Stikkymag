import type { Metadata, Viewport } from "next";
import { BottomDock } from "@/components/BottomDock";
import { Cart } from "@/components/Cart";
import { Navbar } from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stikkymag | Custom Keychains & Fridge Magnets",
  description:
    "A premium storefront for pre-designed and custom keychains and fridge magnets with WhatsApp-based checkout.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/stikkymag-logo.svg",
    apple: "/stikkymag-logo.svg",
  },
  appleWebApp: {
    capable: true,
    title: "Stikkymag",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-background text-foreground antialiased">
        <CartProvider>
          <div className="relative min-h-screen overflow-x-clip">
            <Navbar />
            {children}
            <Cart />
            <BottomDock />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
