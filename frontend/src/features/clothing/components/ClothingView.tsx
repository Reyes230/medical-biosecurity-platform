import { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Loader2, AlertCircle } from 'lucide-react';
import { useGetProducts } from '../../catalog/hooks/useGetProducts';

export default function ClothingView() {
  const { data: allProducts, isLoading, isError, error } = useGetProducts();
  const [selectedColor, setSelectedColor] = useState<string>('Todos');

  // 1. Aplanar Variantes: Extraemos solo "Ropa Médica" y convertimos cada variante en un ítem de la grilla
  const variantsList = useMemo(() => {
    if (!allProducts) return [];
    return allProducts
      .filter(p => p.category === 'Ropa Médica')
      .flatMap(product => 
        product.variants.map(variant => ({
          productName: product.name,
          ...variant
        }))
      );
  }, [allProducts]);

  // 2. Extraer filtros dinámicamente según lo que venga de PostgreSQL
  const colors = useMemo(() => {
    const colorSet = new Set<string>();
    variantsList.forEach(v => {
      if (v.attributes.Color) colorSet.add(v.attributes.Color);
    });
    return ['Todos', ...Array.from(colorSet).sort()];
  }, [variantsList]);

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  // 3. Aplicar Filtro de UI
  const filteredVariants = selectedColor === 'Todos' 
    ? variantsList 
    : variantsList.filter(v => v.attributes.Color === selectedColor);

  // Utilidad visual para transformar "Scrub_amarilloarena" -> "AMARILLOARENA" en la UI
  const formatColorLabel = (rawColor?: string) => {
    if (!rawColor) return 'Estándar';
    return rawColor.replace(/^Scrub_/i, '').toUpperCase();
  };

  // Estados de carga (similares a SuppliesView)
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="text-sm text-slate-500 font-medium animate-pulse">Cargando colección textil...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 max-w-2xl mx-auto flex items-start gap-4">
        <AlertCircle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-red-900 font-sans">Error de Comunicación API</h4>
          <p className="text-xs text-red-700 leading-relaxed">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-medical-dark font-sans">
          Colección de Indumentaria Médica Premium
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Diseño textil ergonómico, tecnología antifluido y máxima comodidad para jornadas extendidas.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* PANEL DE FILTROS */}
        <aside className="space-y-6 bg-white p-5 border border-slate-200 rounded-xl shadow-xs md:col-span-1 h-fit sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-semibold text-medical-dark flex items-center gap-2 font-sans">
              <Filter className="h-4 w-4 text-primary" /> Filtros
            </h3>
            <SlidersHorizontal className="h-4 w-4 text-slate-400 md:hidden" />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Color de Uniforme</label>
            <div className="flex flex-wrap gap-2 md:flex-col md:gap-1 max-h-96 overflow-y-auto pr-1">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`text-left px-3 py-1.5 text-xs rounded-md font-medium transition-colors w-auto md:w-full cursor-pointer ${
                    selectedColor === color
                      ? 'bg-sky-50 text-primary font-semibold border border-sky-200'
                      : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  {formatColorLabel(color)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Tallas</label>
            <div className="flex flex-wrap gap-1.5">
              {sizes.map((size) => (
                <button key={size} className="h-8 w-8 text-xs font-semibold rounded-md border border-slate-200 hover:border-primary hover:text-primary transition-colors flex items-center justify-center bg-surface cursor-pointer">
                  {size}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* CONTENEDOR DE PRODUCTOS (VARIANTES APLANADAS) */}
        <section className="md:col-span-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVariants.map((variant) => (
              <div key={variant.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs hover:shadow-sm transition-shadow">
                
                {/* RESOLUCIÓN DINÁMICA DE IMÁGENES WEBP */}
                <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden">
                  {variant.attributes.Color ? (
                    <img 
                      src={`/images/scrubs/llanos/${variant.attributes.Color.toLowerCase()}.webp`} 
                      alt={`Uniforme ${variant.attributes.Color}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = `<span class="text-xs font-bold text-slate-400">Sin Imagen</span>`;
                      }}
                    />
                  ) : (
                    <span className="text-xs font-bold text-primary uppercase bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                      {variant.attributes.Tela || 'Básico'}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4 space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-medium tracking-tight uppercase">
                      {variant.attributes.Genero || 'Unisex'}
                    </p>
                    <h4 className="text-sm font-semibold text-medical-dark group-hover:text-primary transition-colors line-clamp-1 font-sans">
                      {variant.productName}
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-600 rounded">
                      Color: {formatColorLabel(variant.attributes.Color)}
                    </span>
                    <span className="inline-block px-2 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-600 rounded">
                      Talla: {variant.attributes.Talla || 'N/A'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 mt-auto border-t border-slate-50">
                    <span className="text-base font-bold text-medical-dark">
                      ${variant.basePrice?.toFixed(2)}
                    </span>
                    <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Stock Activo
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}