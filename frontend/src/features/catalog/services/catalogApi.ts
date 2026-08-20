import { apiFetch } from '../../../config/api.config';
import type {
  ProductCatalogResponse,
  CreateProductRequest,
  UpdateProductRequest,
} from '../types/product.types';

export const catalogApi = {
  getProducts: async (): Promise<ProductCatalogResponse[]> => {
    return apiFetch<ProductCatalogResponse[]>('/products', {
      method: 'GET',
    });
  },

  getProductById: async (id: string): Promise<ProductCatalogResponse> => {
    return apiFetch<ProductCatalogResponse>(`/products/${id}`, {
      method: 'GET',
    });
  },

  createProduct: async (payload: CreateProductRequest): Promise<string> => {
    return apiFetch<string>('/products', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  updateProduct: async ({ id, data }: { id: string; data: UpdateProductRequest }): Promise<void> => {
    return apiFetch<void>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteProduct: async (id: string): Promise<void> => {
    return apiFetch<void>(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};