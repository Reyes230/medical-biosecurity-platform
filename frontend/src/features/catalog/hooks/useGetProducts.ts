// src/features/catalog/hooks/useGetProducts.ts
import { useQuery } from '@tanstack/react-query';
import { catalogApi } from '../services/catalogApi';
import type { ProductCatalogResponse } from '../types/product.types';

export const useGetProducts = () => {
  return useQuery<ProductCatalogResponse[], Error>({
    queryKey: ['products'],          // Identificador único para la caché
    queryFn: catalogApi.getProducts, // Función que ejecuta la petición
    staleTime: 1000 * 60 * 5,        // Los datos se consideran frescos por 5 minutos
  });
};