import { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Loader2, AlertCircle, ArrowLeft, MessageSquare } from 'lucide-react';
import { useGetProducts } from '../../catalog/hooks/useGetProducts';
import { COMPANY_INFO } from '../../../config/company.config';

export default function ClothingView() {
  const { data: allProducts, isLoading, isError, error } = useGetProducts();
  const [selectedColor, setSelectedColor] = useState<string>('Todos');
  
  // NUEVO ESTADO: Maneja la variante seleccionada para la vista de detalle
  const [selectedVariant, setSelectedVariant] = useState<any | null>(null);

  const variantsList = useMemo(() => {
    if (!allProducts) return [];
    return allProducts
      .filter(p => p.category === 'Ropa Médica')
      .flatMap(product => 
        product.variants.map(variant => ({
          productName: product.name,
          productDescription: product.description, // Traemos la descripción del padre
          ...variant
        }))
      );
  }, [allProducts]);

  const colors = useMemo(() => {
    const colorSet = new Set<string>();
    variantsList.forEach(v => {
      if (v.attributes.Color) colorSet.add(v.attributes.Color);
    });
    return ['Todos', ...Array.from(colorSet).sort()];
  }, [variantsList]);

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const filteredVariants = selectedColor === 'Todos' 
    ? variantsList 
    : variantsList.filter(v => v.attributes.Color === selectedColor);

  const formatColorLabel = (rawColor?: string) => {
    if (!rawColor) return 'Estándar';
    return rawColor.replace(/^Scrub_/i, '').toUpperCase();
  };

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

  // ==========================================
  // VISTA DE DETALLE INDIVIDUAL
  // ==========================================
  if (selectedVariant) {
    const whatsappText = `Hola ${COMPANY_INFO.name}, me gustaría cotizar el siguiente uniforme:\n\n*Producto:* ${selectedVariant.productName}\n*Color:* ${formatColorLabel(selectedVariant.attributes.Color)}\n*SKU:* ${selectedVariant.sku}\n*Precio Ref:* $${selectedVariant.basePrice?.toFixed(2)} ${selectedVariant.currency || 'USD'}`;
    const variantWhatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button 
          onClick={() => setSelectedVariant(null)}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a la colección
        </button>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
          
          {/* Columna Izquierda: Imagen Grande */}
          <div className="md:w-1/2 bg-slate-50 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
            {selectedVariant.attributes.Color ? (
              <img 
                src={`/images/scrubs/llanos/${selectedVariant.attributes.Color.toLowerCase()}.webp`} 
                alt={`Uniforme ${selectedVariant.attributes.Color}`}
                className="max-w-full h-auto max-h-[500px] object-contain drop-shadow-md"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `<span class="text-sm font-bold text-slate-400">Imagen no disponible</span>`;
                }}
              />
            ) : (
              <div className="h-64 w-full flex items-center justify-center">
                 <span className="text-sm font-bold text-slate-400">Imagen no disponible</span>
              </div>
            )}
          </div>

          {/* Columna Derecha: Información y CTA */}
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-sky-50 text-primary rounded-full border border-sky-100">
                    {selectedVariant.attributes.Tela || 'Antifluido Premium'}
                  </span>
                  <span className="inline-block px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                    SKU: {selectedVariant.sku}
                  </span>
                </div>
                <h1 className="text-3xl font-extrabold text-medical-dark font-sans tracking-tight">
                  {selectedVariant.productName}
                </h1>
                <p className="mt-3 text-slate-500 leading-relaxed text-sm">
                  {selectedVariant.productDescription}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase text-slate-400 tracking-wide">Color</p>
                  <p className="font-semibold text-medical-dark">{formatColorLabel(selectedVariant.attributes.Color)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase text-slate-400 tracking-wide">Talla</p>
                  <p className="font-semibold text-medical-dark">{selectedVariant.attributes.Talla || 'Por definir'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase text-slate-400 tracking-wide">Género</p>
                  <p className="font-semibold text-medical-dark">{selectedVariant.attributes.Genero || 'Unisex'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase text-slate-400 tracking-wide">Disponibilidad</p>
                  <p className="font-semibold text-emerald-600 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Stock Activo
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-4 pt-6 border-t border-slate-100">
              <div className="flex items-end gap-2">
                <p className="text-4xl font-extrabold text-medical-dark tracking-tight">
                  ${selectedVariant.basePrice?.toFixed(2)}
                </p>
                <p className="text-sm font-semibold text-slate-400 mb-1">{selectedVariant.currency || 'USD'}</p>
              </div>

              <a
                href={variantWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-base font-bold text-white shadow-xs hover:bg-emerald-700 hover:shadow-md transition-all cursor-pointer font-sans"
              >
                <MessageSquare className="h-5 w-5" />
                Cotizar este modelo por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VISTA DE GRILLA (CATÁLOGO PRINCIPAL)
  // ==========================================
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

        {/* CONTENEDOR DE PRODUCTOS */}
        <section className="md:col-span-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVariants.map((variant) => (
              <div 
                key={variant.id} 
                onClick={() => setSelectedVariant(variant)} // Acción que activa la vista de detalle
                className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden relative">
                  {/* Capa superpuesta para indicar que es clickeable */}
                  <div className="absolute inset-0 bg-medical-dark/0 group-hover:bg-medical-dark/5 transition-colors z-10"></div>
                  
                  {variant.attributes.Color ? (
                    <img 
                      src={`/images/scrubs/llanos/${variant.attributes.Color.toLowerCase()}.webp`} 
                      alt={`Uniforme ${variant.attributes.Color}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                      Ver detalle
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