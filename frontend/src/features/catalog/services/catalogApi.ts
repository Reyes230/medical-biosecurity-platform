// src/features/catalog/services/catalogApi.ts
import { apiFetch } from '../../../config/api.config';
import type { ProductCatalogResponse } from '../types/product.types';

export const catalogApi = {
  /**
   * Obtiene la lista completa de productos con sus variantes dinámicas
   */
  getProducts: async (): Promise<ProductCatalogResponse[]> => {
    return apiFetch<ProductCatalogResponse[]>('/products', {
      method: 'GET',
    });
  },
};