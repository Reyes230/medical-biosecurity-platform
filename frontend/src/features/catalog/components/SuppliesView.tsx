// src/features/catalog/components/SuppliesView.tsx
import { useState } from 'react';
import { useGetProducts } from '../hooks/useGetProducts';
import { AlertCircle, ChevronDown, ChevronUp, Loader2, Package, Tag } from 'lucide-react';

export default function SuppliesView() {
  const { data: products, isLoading, isError, error } = useGetProducts();
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);

  const toggleProduct = (id: string) => {
    setExpandedProductId(expandedProductId === id ? null : id);
  };

  // 1. ESTADO DE CARGA (Loading Skeleton Eficiente)
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="text-sm text-slate-500 font-medium animate-pulse">Sincronizando catálogo con el servidor Docker...</p>
      </div>
    );
  }

  // 2. ESTADO DE ERROR CONTROLADO
  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 max-w-2xl mx-auto flex items-start gap-4">
        <AlertCircle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-red-900 font-sans">Error de Comunicación API</h4>
          <p className="text-xs text-red-700 leading-relaxed">
            No se pudo conectar con el Business Core. Asegúrate de que el contenedor de Spring Boot esté arriba. Detalles: {error?.message}
          </p>
        </div>
      </div>
    );
  }

  // 3. ESTADO SINFÍN / SIN DATOS
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-slate-200 bg-white rounded-xl max-w-2xl mx-auto space-y-3">
        <Package className="h-10 w-10 text-slate-300 mx-auto" />
        <h4 className="text-sm font-semibold text-medical-dark font-sans">Catálogo Vacío</h4>
        <p className="text-xs text-slate-400 max-w-xs mx-auto">No hay productos registrados en este momento. Utiliza la API de escritura para poblar el inventario inicial.</p>
      </div>
    );
  }

  // 4. RENDERIZADO DEL CATÁLOGO REAL
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-medical-dark font-sans">
          Catálogo Global de Insumos Médicos
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Listado de dispositivos y consumibles con sincronización de variantes dinámicas JSONB en tiempo real.
        </p>
      </div>

      {/* Contenedor de Tabla Adaptativo a Pantallas Móviles */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
              <th className="py-3 px-4 w-10"></th>
              <th className="py-3 px-4 font-sans">Producto</th>
              <th className="py-3 px-4 font-sans hidden sm:table-cell">Categoría</th>
              <th className="py-3 px-4 font-sans text-right">Precio Base</th>
              <th className="py-3 px-4 font-sans text-center">Variantes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {products.map((product) => {
              const isExpanded = expandedProductId === product.id;
              return (
                <caption key={product.id} className="w-full text-left p-0 display: table-row-group">
                  {/* Fila Principal de Producto */}
                  <tr 
                    onClick={() => toggleProduct(product.id)}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-4 text-center">
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-medical-dark group-hover:text-primary transition-colors font-sans">
                        {product.name}
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-1 max-w-md mt-0.5">{product.description}</div>
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell text-slate-600">
                      <span className="inline-flex items-center gap-1 text-xs font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        <Tag className="h-3 w-3" />
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-medical-dark">
                      ${product.basePrice.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-center font-medium text-slate-500">
                      {product.variants?.length || 0}
                    </td>
                  </tr>

                  {/* Fila Desplegable: Detalle de Variantes Dinámicas JSONB */}
                  {isExpanded && (
                    <tr>
                      <td colSpan={5} className="bg-slate-50/50 p-4 border-t border-slate-100">
                        <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
                          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">
                            Variantes Disponibles e Inventario Base
                          </h5>
                          
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {product.variants?.map((variant) => (
                              <div key={variant.id} className="rounded-lg border border-slate-100 bg-surface p-3 text-xs space-y-2">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                                  <span className="font-mono font-bold text-slate-700">{variant.sku}</span>
                                  <span className="font-bold text-primary">${variant.price.toFixed(2)}</span>
                                </div>
                                
                                {/* Renderizado 100% dinámico del mapa de atributos JSONB */}
                                <div className="space-y-1">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase">Atributos Técnicos:</p>
                                  {Object.entries(variant.attributes).length > 0 ? (
                                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-600">
                                      {Object.entries(variant.attributes).map(([key, value]) => (
                                        <div key={key} className="truncate">
                                          <span className="font-medium text-slate-400 capitalize">{key}:</span> {value}
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-slate-400 italic text-[11px]">Sin atributos específicos.</p>
                                  )}
                                </div>

                                <div className="flex items-center justify-between pt-1 border-t border-slate-100/60 text-slate-500">
                                  <span>Stock en Bodega:</span>
                                  <span className={`font-semibold ${variant.stock <= 10 ? 'text-amber-600 font-bold' : 'text-slate-700'}`}>
                                    {variant.stock} u.
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </caption>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}