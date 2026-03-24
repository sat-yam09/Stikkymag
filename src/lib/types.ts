export type ProductType = "keychain" | "fridge-magnet";

export type ProductKind = "pre-designed" | "custom";

export type ProductShape = "circle" | "square";

export type CatalogProduct = {
  id: string;
  title: string;
  description: string;
  badge: string;
  kind: "pre-designed";
  productType: ProductType;
  shape: ProductShape;
  price: number;
  image: string;
  accent: string;
};

export type CartItem = {
  id: string;
  sku: string;
  title: string;
  kind: ProductKind;
  productType: ProductType;
  shape: ProductShape;
  unitPrice: number;
  quantity: number;
  image: string;
  previewReference: string;
  hostedImageUrl?: string;
  fileName?: string;
  accent: string;
};

export type CheckoutDetails = {
  name: string;
  phone: string;
  address: string;
  note: string;
};

export type ProcessedUpload = {
  dataUrl: string;
  fileName: string;
  sizeLabel: string;
};
