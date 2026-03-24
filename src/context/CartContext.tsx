"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, CatalogProduct, ProductShape, ProductType } from "@/lib/types";
import {
  getComboSavings,
  getCartQuantity,
  getDeliveryFee,
  getListSubtotal,
  getSubtotal,
} from "@/lib/utils";

const CART_STORAGE_KEY = "stikkymag-cart-v1";
const LEGACY_CART_STORAGE_KEY = "keepsake-atelier-cart-v1";

type AddCustomProductInput = {
  title: string;
  productType: ProductType;
  shape: ProductShape;
  image: string;
  previewReference: string;
  fileName: string;
  unitPrice: number;
  accent?: string;
};

type CartContextValue = {
  items: CartItem[];
  isCartOpen: boolean;
  hydrated: boolean;
  itemCount: number;
  listSubtotal: number;
  subtotal: number;
  comboSavings: number;
  deliveryFee: number;
  total: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  clearCart: () => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  addPreDesignedProduct: (product: CatalogProduct) => void;
  addCustomProduct: (input: AddCustomProductInput) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function createItemId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedValue =
        window.localStorage.getItem(CART_STORAGE_KEY) ||
        window.localStorage.getItem(LEGACY_CART_STORAGE_KEY);

      if (storedValue) {
        const parsedItems = JSON.parse(storedValue) as CartItem[];

        if (Array.isArray(parsedItems)) {
          setItems(parsedItems);
          window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(parsedItems));
          window.localStorage.removeItem(LEGACY_CART_STORAGE_KEY);
        }
      }
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
      window.localStorage.removeItem(LEGACY_CART_STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const itemCount = getCartQuantity(items);
  const listSubtotal = getListSubtotal(items);
  const subtotal = getSubtotal(items);
  const comboSavings = getComboSavings(items);
  const discountedSubtotal = subtotal;
  const deliveryFee = getDeliveryFee(discountedSubtotal);
  const total = discountedSubtotal + deliveryFee;

  function openCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  function toggleCart() {
    setIsCartOpen((currentValue) => !currentValue);
  }

  function clearCart() {
    setItems([]);
  }

  function removeItem(id: string) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }

  function updateQuantity(id: string, quantity: number) {
    const nextQuantity = Math.max(1, Math.min(quantity, 99));

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity: nextQuantity } : item,
      ),
    );
  }

  function addPreDesignedProduct(product: CatalogProduct) {
    setItems((currentItems) => {
      const matchingItem = currentItems.find(
        (item) => item.kind === "pre-designed" && item.sku === product.id,
      );

      if (matchingItem) {
        return currentItems.map((item) =>
          item.id === matchingItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...currentItems,
        {
          id: createItemId("stock"),
          sku: product.id,
          title: product.title,
          kind: "pre-designed",
          productType: product.productType,
          shape: product.shape,
          unitPrice: product.price,
          quantity: 1,
          image: product.image,
          previewReference: `SKU ${product.id.toUpperCase()}`,
          accent: product.accent,
        },
      ];
    });

    setIsCartOpen(true);
  }

  function addCustomProduct(input: AddCustomProductInput) {
    setItems((currentItems) => [
      ...currentItems,
      {
        id: createItemId("custom"),
        sku: createItemId("preview"),
        title: input.title,
        kind: "custom",
        productType: input.productType,
        shape: input.shape,
        unitPrice: input.unitPrice,
        quantity: 1,
        image: input.image,
        previewReference: input.previewReference,
        fileName: input.fileName,
        accent: input.accent || "#e6efe9",
      },
    ]);

    setIsCartOpen(true);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        hydrated,
        itemCount,
        listSubtotal,
        subtotal,
        comboSavings,
        deliveryFee,
        total,
        openCart,
        closeCart,
        toggleCart,
        clearCart,
        removeItem,
        updateQuantity,
        addPreDesignedProduct,
        addCustomProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const value = useContext(CartContext);

  if (!value) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return value;
}
