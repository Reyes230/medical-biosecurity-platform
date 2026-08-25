export interface CartItem {
  variantId: string;
  productId: string;
  productName: string;
  sku: string;
  price: number;
  currency: string;
  quantity: number;
  attributes?: Record<string, string>;
  category: string;
}

export interface StoredCart {
  items: CartItem[];
  updatedAt: number; // Timestamp para control de expiración (TTL)
}