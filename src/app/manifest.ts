import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stikkymag",
    short_name: "Stikkymag",
    description:
      "Custom keychains and fridge magnets with live preview and WhatsApp checkout.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f3f3",
    theme_color: "#111111",
    icons: [
      {
        src: "/stikkymag-logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
