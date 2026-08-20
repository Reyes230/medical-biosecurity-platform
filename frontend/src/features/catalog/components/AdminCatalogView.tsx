import { useState } from 'react';
import { useGetProducts } from '../hooks/useGetProducts';
import { useProductMutations } from '../hooks/useProductMutations';
import AdminProductForm from './AdminProductForm';
import type { ProductCatalogResponse } from '../types/product.types';
import { Plus, Edit2, Trash2, Loader2, AlertCircle, Package } from 'lucide-react';

export default function AdminCatalogView() {
  const { data: products, isLoading, isError, error } = useGetProducts();
  const { deleteProduct } = useProductMutations();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<ProductCatalogResponse | null>(null);

  const handleEdit = (product: ProductCatalogResponse) => {
    setProductToEdit(product);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setProductToEdit(null);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar permanentemente el producto "${name}"?`)) {
      try {
        await deleteProduct.mutateAsync(id);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error desconocido';
        alert(`Error al eliminar el producto: ${message}`);
      }
    }
  };

  if (isFormOpen) {
    return (
      <AdminProductForm
        productToEdit={productToEdit}
        onSuccess={() => setIsFormOpen(false)}
        onCancel={() => setIsFormOpen(false)}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="text-sm text-slate-500 font-medium">Cargando inventario administrativo...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 max-w-2xl mx-auto flex items-start gap-4">
        <AlertCircle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-red-900">Error al cargar productos</h4>
          <p className="text-xs text-red-700">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-medical-dark font-sans">
            Gestión Operativa de Productos
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Administra los insumos y prendas médicas registrados en la base de datos.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-sky-700 transition-colors cursor-pointer"
        >
          <Plus className="h-4 w-4" /> Nuevo Producto
        </button>
      </div>

      {!products || products.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-slate-200 bg-white rounded-xl max-w-2xl mx-auto space-y-3">
          <Package className="h-10 w-10 text-slate-300 mx-auto" />
          <h4 className="text-sm font-semibold text-medical-dark">Sin productos</h4>
          <p className="text-xs text-slate-400">No hay productos registrados en la base de datos.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Producto</th>
                <th className="py-3 px-4 hidden sm:table-cell">Categoría</th>
                <th className="py-3 px-4 text-center">Variantes</th>
                <th className="py-3 px-4 text-right">Precio Ref.</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {products.map((product) => {
                const basePrice = product.variants?.[0]?.basePrice ?? 0;
                return (
                  <tr key={product.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-medical-dark">{product.name}</div>
                      <div className="text-xs text-slate-400 line-clamp-1 max-w-xs">{product.description}</div>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell text-slate-600 text-xs">
                      <span className="bg-slate-100 px-2 py-0.5 rounded font-medium">{product.category}</span>
                    </td>
                    <td className="py-3 px-4 text-center font-medium text-slate-500 text-xs">
                      {product.variants?.length || 0}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-medical-dark">
                      ${basePrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-1.5 text-slate-500 hover:text-primary rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Editar producto"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                          title="Eliminar producto"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}