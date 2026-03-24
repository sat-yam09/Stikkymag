import type { CartItem, CheckoutDetails } from "@/lib/types";
import {
  TWO_ITEM_COMBO_PRICE,
  formatCurrency,
  getComboSavings,
  getDeliveryFee,
  getKindLabel,
  getListSubtotal,
  getLineTotal,
  getProductTypeLabel,
  getShapeLabel,
  SINGLE_PRODUCT_PRICE,
  getSubtotal,
} from "@/lib/utils";

export const WHATSAPP_NUMBER = "919824006191";

export function generateOrderId() {
  const now = new Date();
  const dateCode = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
    2,
    "0",
  )}${String(now.getDate()).padStart(2, "0")}`;
  const randomCode = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `KA-${dateCode}-${randomCode}`;
}

export function buildWhatsappMessage(params: {
  orderId: string;
  items: CartItem[];
  checkout: CheckoutDetails;
}) {
  const { orderId, items, checkout } = params;
  const listSubtotal = getListSubtotal(items);
  const subtotal = getSubtotal(items);
  const comboSavings = getComboSavings(items);
  const deliveryFee = getDeliveryFee(subtotal);
  const grandTotal = subtotal + deliveryFee;

  const lines = [
    "Hello, I want to order:",
    "",
    `Order ID: ${orderId}`,
    "",
    "Product Details:",
  ];

  items.forEach((item, index) => {
    lines.push(`${index + 1}.`);
    lines.push(`- Product: ${getProductTypeLabel(item.productType)}`);
    lines.push(`- Type: ${getKindLabel(item.kind)}`);
    lines.push(`- Shape: ${getShapeLabel(item.shape)}`);
    lines.push(`- Quantity: ${item.quantity}`);
    lines.push(
      `- Price: ${formatCurrency(getLineTotal(item.quantity, item.unitPrice))}`,
    );
    lines.push(
      `- Pricing Rule: ${formatCurrency(SINGLE_PRODUCT_PRICE)} for 1 / ${formatCurrency(TWO_ITEM_COMBO_PRICE)} for 2`,
    );
    lines.push(`- Preview Image: ${item.previewReference}`);

    if (item.fileName) {
      lines.push(`- File Name: ${item.fileName}`);
    }

    lines.push("");
  });

  lines.push("Pricing:");
  lines.push(`- List Total: ${formatCurrency(listSubtotal)}`);
  if (comboSavings > 0) {
    lines.push(`- Combo Savings: -${formatCurrency(comboSavings)}`);
  }
  lines.push(`- Subtotal: ${formatCurrency(subtotal)}`);
  lines.push("- Delivery Charge: Will be mentioned after order confirmation");
  lines.push(`- Total: ${formatCurrency(grandTotal)}`);
  lines.push("");
  lines.push("Customer Details:");
  lines.push(`- Name: ${checkout.name}`);
  lines.push(`- Phone: ${checkout.phone}`);
  lines.push(`- Address: ${checkout.address}`);

  if (checkout.note.trim()) {
    lines.push(`- Note: ${checkout.note.trim()}`);
  }

  return lines.join("\n");
}

export function createWhatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
