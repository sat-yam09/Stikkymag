import type { CatalogProduct, ProductShape, ProductType } from "@/lib/types";
import { SINGLE_PRODUCT_PRICE } from "@/lib/utils";

export const designedProducts: CatalogProduct[] = [
  {
    id: "zootopia-duo",
    title: "Zootopia Duo",
    description:
      "A playful cartoon-inspired circle keychain with a bright floral backdrop and glossy finish.",
    badge: "New Arrival",
    kind: "pre-designed",
    productType: "keychain",
    shape: "circle",
    price: SINGLE_PRODUCT_PRICE,
    image: "/products/zootopia-duo-keychain.jpeg",
    accent: "#efe7f5",
  },
  {
    id: "shiv-vibe",
    title: "Shiv Vibe",
    description:
      "A bold illustrated keychain with temple-inspired styling and a soft blossom product shot.",
    badge: "Trending",
    kind: "pre-designed",
    productType: "keychain",
    shape: "circle",
    price: SINGLE_PRODUCT_PRICE,
    image: "/products/shiv-vibe-keychain.jpeg",
    accent: "#f2e5de",
  },
  {
    id: "spider-sense",
    title: "Spider Sense",
    description:
      "A punchy superhero-style keychain with energetic artwork and a collector-drop look.",
    badge: "Fan Pick",
    kind: "pre-designed",
    productType: "keychain",
    shape: "circle",
    price: SINGLE_PRODUCT_PRICE,
    image: "/products/spider-sense-keychain.jpeg",
    accent: "#f5ead7",
  },
];

export function getDesignedProductById(id: string) {
  return designedProducts.find((product) => product.id === id);
}

export function getCustomProductPrice(
  productType: ProductType,
  shape: ProductShape,
) {
  void productType;
  void shape;
  return SINGLE_PRODUCT_PRICE;
}
