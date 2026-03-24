import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stikkymag",
    short_name: "Stikkymag",
    description:
      "Custom keychains and fridge magnets with live preview and WhatsApp checkout.",
    start_url: "/",
    display: "standalone",
    background_color: "#f2eee6",
    theme_color: "#163a33",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
