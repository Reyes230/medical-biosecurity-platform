export type DynamicAttributes = Record<string, string>;

export interface VariantResponse {
  id: string;
  sku: string;
  basePrice: number;
  currency: string;
  attributes: DynamicAttributes;
}

export interface ProductCatalogResponse {
  id: string;
  name: string;
  description: string;
  category: string;
  variants: VariantResponse[];
}

export interface CreateProductRequest {
  name: string;
  description: string;
  category: string;
  sku: string;
  basePrice: number;
  currency: string;
  attributes: DynamicAttributes;
}

export interface UpdateVariantRequest {
  id?: string;
  sku: string;
  basePrice: number;
  currency: string;
  attributes: DynamicAttributes;
}

export interface UpdateProductRequest {
  name: string;
  description: string;
  category: string;
  variants: UpdateVariantRequest[];
}