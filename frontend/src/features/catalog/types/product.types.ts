// Representa el mapa dinámico JSONB de PostgreSQL
export type DynamicAttributes = Record<string, string>;

export interface VariantResponse {
  id: string;
  sku: string;
  basePrice: number;   // ◄ Cambiado de 'price' a 'basePrice' para alinearse con tu Backend
  currency: string;    // ◄ Añadido ya que viene en tu JSON
  attributes: DynamicAttributes;
  stock?: number;      // ◄ Lo dejamos opcional ya que no viene en el JSON actual
}

export interface ProductCatalogResponse {
  id: string;
  name: string;
  description: string;
  category: string;
  variants: VariantResponse[]; // ◄ Removimos basePrice de la raíz porque tu JSON no lo trae ahí
}

export interface RegisterVariantRequest {
  sku: string;
  price: number;
  stock: number;
  attributes: DynamicAttributes;
}

export interface RegisterProductRequest {
  name: string;
  description: string;
  category: string;
  basePrice: number;
  variants: RegisterVariantRequest[];
}