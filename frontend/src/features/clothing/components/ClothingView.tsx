import { useState, useMemo } from 'react';
import {
  Filter,
  Loader2,
  AlertCircle,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Check,
  Tag,
} from 'lucide-react';
import { useGetProducts } from '../../catalog/hooks/useGetProducts';
import type { VariantResponse } from '../../catalog/types/product.types';
import { COMPANY_INFO } from '../../../config/company.config';

interface ClothingVariantItem extends VariantResponse {
  productName: string;
  productDescription: string;
}

export default function ClothingView() {
  const { data: allProducts, isLoading, isError, error } = useGetProducts();
  const [selectedColor, setSelectedColor] = useState<string>('Todos');
  const [selectedSize, setSelectedSize] = useState<string>('Todas');
  const [selectedVariant, setSelectedVariant] = useState<ClothingVariantItem | null>(null);

  const variantsList: ClothingVariantItem[] = useMemo(() => {
    if (!allProducts) return [];
    return allProducts
      .filter((p) => p.category === 'Ropa Médica')
      .flatMap((product) =>
        product.variants.map((variant) => ({
          ...variant,
          productName: product.name,
          productDescription: product.description,
        }))
      );
  }, [allProducts]);

  const colors = useMemo(() => {
    const colorSet = new Set<string>();
    variantsList.forEach((v) => {
      if (v.attributes.Color) colorSet.add(v.attributes.Color);
    });
    return ['Todos', ...Array.from(colorSet).sort()];
  }, [variantsList]);

  const sizes = ['Todas', 'XS', 'S', 'M', 'L', 'XL'];

  const filteredVariants = useMemo(() => {
    return variantsList.filter((v) => {
      const matchColor = selectedColor === 'Todos' || v.attributes.Color === selectedColor;
      const matchSize = selectedSize === 'Todas' || v.attributes.Talla?.toUpperCase() === selectedSize.toUpperCase();
      return matchColor && matchSize;
    });
  }, [variantsList, selectedColor, selectedSize]);

  const formatColorLabel = (rawColor?: string) => {
    if (!rawColor) return 'Estándar';
    return rawColor.replace(/^Scrub_/i, '').replace(/_/g, ' ').toUpperCase();
  };

  const hasActiveFilters = selectedColor !== 'Todos' || selectedSize !== 'Todas';

  const resetFilters = () => {
    setSelectedColor('Todos');
    setSelectedSize('Todas');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="relative flex items-center justify-center">
          <div className="h-12 w-12 rounded-full border-2 border-sky-100 border-t-primary animate-spin" />
          <Loader2 className="h-5 w-5 text-primary absolute animate-pulse" />
        </div>
        <p className="text-sm font-medium text-slate-500 tracking-tight animate-pulse">
          Sincronizando catálogo textil y variantes...
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

  // ==========================================
  // VISTA DE DETALLE INDIVIDUAL
  // ==========================================
  if (selectedVariant) {
    const colorFormatted = formatColorLabel(selectedVariant.attributes.Color);
    const whatsappText = `Hola ${COMPANY_INFO.name}, estoy interesado en cotizar el siguiente uniforme médico:\n\n*Modelo:* ${selectedVariant.productName}\n*Color:* ${colorFormatted}\n*Talla:* ${selectedVariant.attributes.Talla || 'A convenir'}\n*Tela:* ${selectedVariant.attributes.Tela || 'Antifluido Premium'}\n*SKU:* ${selectedVariant.sku}\n*Precio Base:* $${selectedVariant.basePrice?.toFixed(2)} ${selectedVariant.currency || 'USD'}`;
    const variantWhatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

    return (
      <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
        <button
          onClick={() => setSelectedVariant(null)}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-primary transition-colors cursor-pointer bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a la colección
        </button>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col lg:flex-row">
          {/* Panel Izquierdo: Visualizador de Prenda */}
          <div className="lg:w-1/2 bg-radial from-slate-50 to-slate-100/60 p-8 sm:p-12 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100 relative min-h-95">
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-white text-primary border border-sky-100 shadow-2xs">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Grado Quirúrgico
              </span>
            </div>

            {selectedVariant.attributes.Color ? (
              <img
                src={`/images/scrubs/llanos/${selectedVariant.attributes.Color.toLowerCase()}.webp`}
                alt={`Uniforme ${selectedVariant.attributes.Color}`}
                className="max-h-115 w-auto object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `
                    <div class="h-64 flex flex-col items-center justify-center text-slate-400 gap-2">
                      <span class="text-sm font-semibold">Fotografía de muestra en actualización</span>
                    </div>
                  `;
                }}
              />
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-2">
                <span className="text-sm font-semibold">Muestra visual estándar</span>
              </div>
            )}
          </div>

          {/* Panel Derecho: Ficha Técnica y Cotizador */}
          <div className="lg:w-1/2 p-8 sm:p-10 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-primary rounded-md border border-sky-100">
                    {selectedVariant.attributes.Tela || 'Antifluido'}
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-mono font-semibold bg-slate-100 text-slate-600 rounded-md">
                    SKU: {selectedVariant.sku}
                  </span>
                </div>
                <h1 className="text-3xl font-extrabold text-medical-dark font-sans tracking-tight">
                  {selectedVariant.productName}
                </h1>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {selectedVariant.productDescription ||
                    'Uniforme de diseño anatómico fabricado en textil de alta densidad con protección antifluidos certificada.'}
                </p>
              </div>

              {/* Especificaciones Clave */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50/70 border border-slate-100 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-400 uppercase font-bold text-[10px] tracking-wide">Color de Tela</span>
                  <p className="font-bold text-medical-dark">{colorFormatted}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 uppercase font-bold text-[10px] tracking-wide">Talla Asignada</span>
                  <p className="font-bold text-medical-dark">{selectedVariant.attributes.Talla || 'Universal'}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 uppercase font-bold text-[10px] tracking-wide">Corte / Género</span>
                  <p className="font-bold text-medical-dark">{selectedVariant.attributes.Genero || 'Unisex'}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 uppercase font-bold text-[10px] tracking-wide">Disponibilidad</span>
                  <p className="font-bold text-emerald-600 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Confección Activa
                  </p>
                </div>
              </div>
            </div>

            {/* Bloque de Precio y WhatsApp CTA */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Precio Unitario:</span>
                <span className="text-3xl font-extrabold text-medical-dark font-sans tracking-tight">
                  ${selectedVariant.basePrice?.toFixed(2)}
                </span>
                <span className="text-xs font-bold text-slate-400">{selectedVariant.currency || 'USD'}</span>
              </div>

              <a
                href={variantWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-xs hover:bg-emerald-700 hover:shadow-md transition-all cursor-pointer font-sans"
              >
                <MessageSquare className="h-4 w-4" />
                Cotizar este uniforme por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VISTA PRINCIPAL: GRILLA Y FILTROS
  // ==========================================
  return (
    <div className="space-y-8">
      {/* Header Visual */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/70 pb-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
            <Sparkles className="h-3.5 w-3.5" /> Línea Quirúrgica & Textil
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-medical-dark font-sans">
            Colección de Indumentaria Médica
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl">
            Uniformes y scrubs diseñados con tecnología antifluido, costuras reforzadas y ergonomía para profesionales de la salud.
          </p>
        </div>

        <div className="text-xs text-slate-500 font-semibold bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs self-start md:self-auto">
          Mostrando <span className="font-bold text-medical-dark">{filteredVariants.length}</span> modelos
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* PANEL LATERAL DE FILTROS */}
        <aside className="space-y-6 bg-white p-6 border border-slate-200/80 rounded-2xl shadow-xs lg:col-span-1 h-fit sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-medical-dark flex items-center gap-2 font-sans">
              <Filter className="h-4 w-4 text-primary" /> Filtros Textil
            </h3>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:text-sky-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" /> Limpiar
              </button>
            )}
          </div>

          {/* Filtro por Tallas */}
          <div className="space-y-2.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Talla</label>
            <div className="grid grid-cols-3 gap-1.5">
              {sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-white border-primary shadow-2xs'
                        : 'bg-surface text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filtro por Color */}
          <div className="space-y-2.5 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Color</label>
              <span className="text-[10px] text-slate-400 font-medium">{colors.length - 1} tonos</span>
            </div>
            <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
              {colors.map((color) => {
                const isSelected = selectedColor === color;
                return (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-sky-50 text-primary font-bold border border-sky-200 shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-50 border border-transparent font-medium'
                    }`}
                  >
                    <span className="truncate">{formatColorLabel(color)}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* CONTENEDOR DE PRODUCTOS (GRILLA) */}
        <section className="lg:col-span-3">
          {filteredVariants.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-200 bg-white rounded-2xl space-y-3">
              <Tag className="h-8 w-8 text-slate-300 mx-auto" />
              <h4 className="text-sm font-bold text-medical-dark">No hay uniformes con estos filtros</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Prueba cambiando la combinación de color o talla seleccionada.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-sky-700 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Restablecer filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredVariants.map((variant) => (
                <div
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 cursor-pointer"
                >
                  {/* Encabezado Visual */}
                  <div className="aspect-square bg-radial from-slate-50 to-slate-100/70 flex items-center justify-center overflow-hidden relative p-4">
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-medical-dark rounded-md border border-slate-200 shadow-2xs">
                        {variant.attributes.Tela || 'Antifluido'}
                      </span>
                    </div>

                    {variant.attributes.Color ? (
                      <img
                        src={`/images/scrubs/llanos/${variant.attributes.Color.toLowerCase()}.webp`}
                        alt={`Uniforme ${variant.attributes.Color}`}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-108 drop-shadow-sm"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = `
                            <div class="h-full flex items-center justify-center text-[11px] font-bold text-slate-400">
                              Sin Fotografía
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-xs font-bold text-primary">
                        {variant.productName}
                      </div>
                    )}
                  </div>

                  {/* Detalle Textual */}
                  <div className="flex flex-1 flex-col p-4 space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {variant.attributes.Genero || 'Unisex'} • Talla {variant.attributes.Talla || 'S'}
                      </span>
                      <h4 className="text-sm font-bold text-medical-dark group-hover:text-primary transition-colors line-clamp-1 font-sans">
                        {formatColorLabel(variant.attributes.Color)}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-1 font-medium">{variant.productName}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-auto border-t border-slate-100">
                      <div className="flex items-baseline gap-1">
                        <span className="text-base font-extrabold text-medical-dark">
                          ${variant.basePrice?.toFixed(2)}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">{variant.currency || 'USD'}</span>
                      </div>
                      <span className="text-[11px] font-bold text-primary group-hover:underline">
                        Ver Ficha &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}