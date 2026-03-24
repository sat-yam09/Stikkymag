import type { CatalogProduct, ProductShape, ProductType } from "@/lib/types";
import { SINGLE_PRODUCT_PRICE } from "@/lib/utils";

export const designedProducts: CatalogProduct[] = [
  {
    id: "monogram-orbit",
    title: "Monogram Orbit",
    description: "A soft ivory keychain with a classic serif monogram and polished edge.",
    badge: "Best Seller",
    kind: "pre-designed",
    productType: "keychain",
    shape: "circle",
    price: SINGLE_PRODUCT_PRICE,
    image: "/products/monogram-orbit-keychain.svg",
    accent: "#efe6d7",
  },
  {
    id: "city-stamp",
    title: "City Stamp",
    description: "Travel-poster inspired artwork turned into an everyday charm.",
    badge: "New Drop",
    kind: "pre-designed",
    productType: "keychain",
    shape: "circle",
    price: SINGLE_PRODUCT_PRICE,
    image: "/products/city-stamp-keychain.svg",
    accent: "#dfe8f4",
  },
  {
    id: "pet-parade",
    title: "Pet Parade",
    description: "A playful pastel portrait style for pet parents and gifting sets.",
    badge: "Gift Pick",
    kind: "pre-designed",
    productType: "keychain",
    shape: "circle",
    price: SINGLE_PRODUCT_PRICE,
    image: "/products/pet-parade-keychain.svg",
    accent: "#fde8d9",
  },
  {
    id: "bloom-badge",
    title: "Bloom Badge",
    description: "Fresh floral detailing for bright kitchen spaces and mood boards.",
    badge: "Fresh Pick",
    kind: "pre-designed",
    productType: "fridge-magnet",
    shape: "circle",
    price: SINGLE_PRODUCT_PRICE,
    image: "/products/bloom-badge-magnet.svg",
    accent: "#ebf2e2",
  },
  {
    id: "sunset-postcard",
    title: "Sunset Postcard",
    description: "A square scenic magnet with a nostalgic weekend getaway feel.",
    badge: "Square Edit",
    kind: "pre-designed",
    productType: "fridge-magnet",
    shape: "square",
    price: SINGLE_PRODUCT_PRICE,
    image: "/products/sunset-postcard-magnet.svg",
    accent: "#faead7",
  },
  {
    id: "cafe-checker",
    title: "Cafe Checker",
    description: "Graphic checkerboard styling with a cozy coffee-shop finish.",
    badge: "Studio Pick",
    kind: "pre-designed",
    productType: "fridge-magnet",
    shape: "square",
    price: SINGLE_PRODUCT_PRICE,
    image: "/products/cafe-checker-magnet.svg",
    accent: "#f4eadd",
  },
];

export function getCustomProductPrice(
  productType: ProductType,
  shape: ProductShape,
) {
  void productType;
  void shape;
  return SINGLE_PRODUCT_PRICE;
}
