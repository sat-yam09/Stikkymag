import type { CartItem, ProductKind, ProductShape, ProductType } from "@/lib/types";

export const SINGLE_PRODUCT_PRICE = 100;
export const TWO_ITEM_COMBO_PRICE = 180;

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

export function getProductTypeLabel(type: ProductType) {
  return type === "keychain" ? "Keychain" : "Fridge Magnet";
}

export function getShapeLabel(shape: ProductShape) {
  return shape === "circle" ? "Circle" : "Square";
}

export function getKindLabel(kind: ProductKind) {
  return kind === "custom" ? "Custom" : "Pre-designed";
}

export function getCartQuantity(items: CartItem[]) {
  return items.reduce((count, item) => count + item.quantity, 0);
}

export function getBaseLineTotal(
  quantity: number,
  unitPrice: number = SINGLE_PRODUCT_PRICE,
) {
  return quantity * unitPrice;
}

export function getComboPriceForTwo(unitPrice: number = SINGLE_PRODUCT_PRICE) {
  return unitPrice === SINGLE_PRODUCT_PRICE ? TWO_ITEM_COMBO_PRICE : unitPrice * 2;
}

export function getLineTotal(quantity: number, unitPrice: number = SINGLE_PRODUCT_PRICE) {
  const pairs = Math.floor(quantity / 2);
  const leftovers = quantity % 2;

  return pairs * getComboPriceForTwo(unitPrice) + leftovers * unitPrice;
}

export function getLineSavings(
  quantity: number,
  unitPrice: number = SINGLE_PRODUCT_PRICE,
) {
  return getBaseLineTotal(quantity, unitPrice) - getLineTotal(quantity, unitPrice);
}

export function getListSubtotal(items: CartItem[]) {
  return items.reduce(
    (sum, item) => sum + getBaseLineTotal(item.quantity, item.unitPrice),
    0,
  );
}

export function getSubtotal(items: CartItem[]) {
  return items.reduce(
    (sum, item) => sum + getLineTotal(item.quantity, item.unitPrice),
    0,
  );
}

export function getComboSavings(items: CartItem[]) {
  return items.reduce(
    (sum, item) => sum + getLineSavings(item.quantity, item.unitPrice),
    0,
  );
}

export function getDeliveryFee(discountedSubtotal: number) {
  void discountedSubtotal;
  return 0;
}
