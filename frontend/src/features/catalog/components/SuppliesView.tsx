import { useState, useMemo, Fragment } from 'react';
import { useGetProducts } from '../hooks/useGetProducts';
import { useCart } from '../../cart/context/CartContext';
import { COMPANY_INFO } from '../../../config/company.config';
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Loader2,
  Package,
  MessageSquare,
  Tag,
  LayoutGrid,
  Table as TableIcon,
  Stethoscope,
  ShieldCheck,
  CheckCircle2,
  Search,
  X,
  RotateCcw,
  ShoppingBag,
} from 'lucide-react';

export default function SuppliesView() {
  const { data: allProducts, isLoading, isError, error } = useGetProducts();
  const { addItem } = useCart();

  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const products = useMemo(() => {
    return allProducts?.filter((p) => p.category !== 'Ropa Médica') || [];
  }, [allProducts]);

  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    products.forEach((p) => {
      if (p.category) categorySet.add(p.category);
    });
    return ['Todas', ...Array.from(categorySet).sort()];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return products.filter((p) => {
      const matchCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
      if (!matchCategory) return false;

      if (!term) return true;

      const matchName = p.name.toLowerCase().includes(term);
      const matchDescription = p.description ? p.description.toLowerCase().includes(term) : false;
      const matchSku = p.variants?.some((v) => v.sku.toLowerCase().includes(term)) ?? false;

      return matchName || matchDescription || matchSku;
    });
  }, [products, selectedCategory, searchTerm]);

  const toggleProduct = (id: string) => {
    setExpandedProductId(expandedProductId === id ? null : id);
  };

  const handleClearFilters = () => {
    setSelectedCategory('Todas');
    setSearchTerm('');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="relative flex items-center justify-center">
          <div className="h-12 w-12 rounded-full border-2 border-sky-100 border-t-primary animate-spin" />
          <Loader2 className="h-5 w-5 text-primary absolute animate-pulse" />
        </div>
        <p className="text-sm font-medium text-slate-500 tracking-tight animate-pulse">
          Sincronizando inventario clínico y consumibles...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50/70 p-6 max-w-2xl mx-auto flex items-start gap-4 shadow-xs">
        <AlertCircle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-red-900 font-sans">Error al consultar catálogo</h4>
          <p className="text-xs text-red-700 leading-relaxed">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Visual */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/70 pb-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
            <Stethoscope className="h-3.5 w-3.5" /> Equipamiento & Consumibles
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-medical-dark font-sans">
            Catálogo Global de Insumos Médicos
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl">
            Suministros clínicos certificados para instituciones hospitalarias, laboratorios y atención ambulatoria.
          </p>
        </div>

        {/* Selector de Modo de Vista */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs self-start md:self-auto">
          <button
            onClick={() => setViewMode('table')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              viewMode === 'table'
                ? 'bg-primary text-white shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <TableIcon className="h-3.5 w-3.5" /> Tabla
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-primary text-white shadow-2xs'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" /> Grilla
          </button>
        </div>
      </div>

      {/* Barra de Búsqueda y Filtros de Categorías */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, SKU o descripción..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-9 text-xs text-medical-dark placeholder:text-slate-400 shadow-2xs focus:border-primary focus:outline-hidden"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Píldoras de Categorías */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-medical-dark text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenido Dinámico */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-200 bg-white rounded-2xl space-y-3">
          <Package className="h-8 w-8 text-slate-300 mx-auto" />
          <h4 className="text-sm font-bold text-medical-dark">No se encontraron productos</h4>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            No hay insumos que coincidan con los criterios de búsqueda aplicados.
          </p>
          {(searchTerm || selectedCategory !== 'Todas') && (
            <button
              onClick={handleClearFilters}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-sky-700 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Limpiar filtros de búsqueda
            </button>
          )}
        </div>
      ) : viewMode === 'table' ? (
        /* ================= VISTA DE TABLA ================= */
        <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4 w-10"></th>
                <th className="py-3.5 px-4 font-sans">Producto / Especificación</th>
                <th className="py-3.5 px-4 font-sans hidden md:table-cell">Categoría</th>
                <th className="py-3.5 px-4 font-sans text-center">Variantes</th>
                <th className="py-3.5 px-4 font-sans text-right">Precio Ref.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredProducts.map((product) => {
                const isExpanded = expandedProductId === product.id;
                const firstVariantPrice = product.variants?.[0]?.basePrice ?? 0;

                return (
                  <Fragment key={product.id}>
                    <tr
                      onClick={() => toggleProduct(product.id)}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-4 text-center">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-primary transition-transform" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-primary transition-transform" />
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-medical-dark group-hover:text-primary transition-colors font-sans text-sm">
                          {product.name}
                        </div>
                        <div className="text-xs text-slate-400 line-clamp-1 max-w-md mt-0.5">
                          {product.description || 'Insumo médico de alta especificación.'}
                        </div>
                      </td>
                      <td className="py-4 px-4 hidden md:table-cell">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                          <Tag className="h-3 w-3 text-slate-400" />
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                          {product.variants?.length || 1}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-extrabold text-medical-dark text-base font-sans">
                          ${firstVariantPrice.toFixed(2)}
                        </span>
                      </td>
                    </tr>

                    {/* Despliegue de Variantes */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={5} className="bg-slate-50/60 p-5 border-t border-slate-100">
                          <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">
                                Opciones y Presentaciones Disponibles
                              </h5>
                              <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                                <CheckCircle2 className="h-3.5 w-3.5" /> Entrega Inmediata / Bajo Pedido
                              </span>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                              {product.variants?.map((variant) => {
                                const safeVariantPrice = variant.basePrice ?? 0;
                                const whatsappText = `Hola ${COMPANY_INFO.name}, deseo cotizar el siguiente insumo médico:\n\n*Producto:* ${product.name}\n*SKU:* ${variant.sku}\n*Precio Ref:* $${safeVariantPrice.toFixed(2)} ${variant.currency || 'USD'}`;
                                const variantWhatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

                                return (
                                  <div
                                    key={variant.id}
                                    className="rounded-xl border border-slate-100 bg-surface p-3.5 text-xs space-y-3 flex flex-col justify-between"
                                  >
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                                        <span className="font-mono font-bold text-slate-700">{variant.sku}</span>
                                        <span className="font-bold text-primary text-sm">
                                          ${safeVariantPrice.toFixed(2)} {variant.currency || 'USD'}
                                        </span>
                                      </div>

                                      {variant.attributes && Object.keys(variant.attributes).length > 0 ? (
                                        <div className="space-y-1 text-slate-600">
                                          {Object.entries(variant.attributes).map(([key, value]) => (
                                            <div key={key} className="flex justify-between text-[11px]">
                                              <span className="text-slate-400 capitalize font-medium">{key}:</span>
                                              <span className="font-semibold text-slate-700">{value}</span>
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <p className="text-slate-400 italic text-[11px]">Presentación estándar</p>
                                      )}
                                    </div>

                                    {/* Acciones: Añadir a la Bolsa + WhatsApp Directo */}
                                    <div className="flex items-center gap-2 pt-1">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          addItem({
                                            variantId: variant.id,
                                            productId: product.id,
                                            productName: product.name,
                                            sku: variant.sku,
                                            price: safeVariantPrice,
                                            currency: variant.currency || 'USD',
                                            attributes: variant.attributes,
                                            category: product.category,
                                          });
                                        }}
                                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-[11px] font-bold text-white hover:bg-sky-700 transition-colors cursor-pointer font-sans shadow-2xs"
                                      >
                                        <ShoppingBag className="h-3.5 w-3.5" />
                                        Añadir
                                      </button>
                                      <a
                                        href={variantWhatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center justify-center p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer shadow-2xs"
                                        title="Cotizar directo por WhatsApp"
                                      >
                                        <MessageSquare className="h-3.5 w-3.5" />
                                      </a>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* ================= VISTA DE GRILLA ================= */
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => {
            const firstVariant = product.variants?.[0];
            const basePrice = firstVariant?.basePrice ?? 0;
            const whatsappText = `Hola ${COMPANY_INFO.name}, deseo cotizar el insumo médico:\n\n*Producto:* ${product.name}\n*Categoría:* ${product.category}\n*Precio Base:* $${basePrice.toFixed(2)} USD`;
            const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

            return (
              <div
                key={product.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-sky-50 text-primary px-2 py-0.5 rounded-md border border-sky-100">
                      <ShieldCheck className="h-3 w-3" />
                      {product.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 font-semibold">
                      {firstVariant?.sku || 'ESTANDAR'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-medical-dark font-sans line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {product.description || 'Insumo médico de alta especificación para clínicas y consultorios.'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 mt-4 border-t border-slate-100">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] text-slate-400 font-bold uppercase">Precio Unitario</span>
                    <span className="text-lg font-extrabold text-medical-dark font-sans">
                      ${basePrice.toFixed(2)}{' '}
                      <span className="text-[10px] font-bold text-slate-400">USD</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (firstVariant) {
                          addItem({
                            variantId: firstVariant.id,
                            productId: product.id,
                            productName: product.name,
                            sku: firstVariant.sku,
                            price: basePrice,
                            currency: firstVariant.currency || 'USD',
                            attributes: firstVariant.attributes,
                            category: product.category,
                          });
                        }
                      }}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-bold text-white hover:bg-sky-700 transition-colors cursor-pointer font-sans shadow-2xs"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" /> Añadir
                    </button>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors cursor-pointer font-sans shadow-2xs"
                    >
                      <MessageSquare className="h-3.5 w-3.5" /> Cotizar
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}