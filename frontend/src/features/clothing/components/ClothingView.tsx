// src/features/clothing/components/ClothingView.tsx
import { useState } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';

// Datos de simulación altamente específicos para validar el comportamiento responsivo de la UI
const MOCK_CLOTHING = [
  { id: '1', name: 'Scrub Quirúrgico Antifluido', category: 'Ropa Médica', price: 34.99, image: 'Bata Azul', attributes: { color: 'Azul Quirúrgico', talla: 'S', tela: 'Antifluido Premium', genero: 'Unisex' } },
  { id: '2', name: 'Bata de Laboratorio Slim Fit', category: 'Ropa Médica', price: 42.50, image: 'Bata Blanca', attributes: { color: 'Blanco Puro', talla: 'M', tela: 'Algodón Egipcio', genero: 'Femenino' } },
  { id: '3', name: 'Conjunto Scrub Clínico Stretch', category: 'Ropa Médica', price: 48.00, image: 'Scrub Gris', attributes: { color: 'Gris Grafito', talla: 'L', tela: 'Spandex de alta elasticidad', genero: 'Masculino' } },
];

export default function ClothingView() {
  const [selectedColor, setSelectedColor] = useState<string>('Todos');

  // Filtros disponibles (Estos mapearán las claves del JSONB en el futuro)
  const colors = ['Todos', 'Azul Quirúrgico', 'Blanco Puro', 'Gris Grafito'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const filteredProducts = selectedColor === 'Todos' 
    ? MOCK_CLOTHING 
    : MOCK_CLOTHING.filter(p => p.attributes.color === selectedColor);

  return (
    <div className="space-y-6">
      {/* Encabezado del Módulo Flagship */}
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-2xl font-bold tracking-tight text-medical-dark font-sans">
          Colección de Indumentaria Médica Premium
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Diseño textil ergonómico, tecnología antifluido y máxima comodidad para jornadas extendidas.
        </p>
      </div>

      {/* Grid Principal Responsivo (1 columna en móvil, 4 en escritorio) */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        
        {/* PANEL DE FILTROS: Superior en móvil, Lateral izquierdo en escritorio */}
        <aside className="space-y-6 bg-white p-5 border border-slate-200 rounded-xl shadow-xs md:col-span-1 h-fit">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-semibold text-medical-dark flex items-center gap-2 font-sans">
              <Filter className="h-4 w-4 text-primary" />
              Filtros de Búsqueda
            </h3>
            <SlidersHorizontal className="h-4 w-4 text-slate-400 md:hidden" />
          </div>

          {/* Filtro por Color (Botones responsivos) */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Color de Uniforme</label>
            <div className="flex flex-wrap gap-2 md:flex-col md:gap-1">
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
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro por Talla */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Tallas Disponibles</label>
            <div className="flex flex-wrap gap-1.5">
              {sizes.map((size) => (
                <button
                  key={size}
                  className="h-8 w-8 text-xs font-semibold rounded-md border border-slate-200 hover:border-primary hover:text-primary transition-colors flex items-center justify-center bg-surface cursor-pointer"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* CONTENEDOR DE PRODUCTOS: Cambia su grilla según el tamaño de pantalla */}
        <section className="md:col-span-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs hover:shadow-sm transition-shadow"
              >
                {/* Marcador de posición para la imagen del uniforme */}
                <div className="aspect-square bg-slate-100 flex items-center justify-center group-hover:opacity-90 transition-opacity p-4">
                  <div className="text-center space-y-1">
                    <span className="text-xs font-bold text-primary uppercase bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                      {product.attributes.tela}
                    </span>
                    <p className="text-xs text-slate-400 block pt-1">Visualización Previa</p>
                  </div>
                </div>

                {/* Detalles técnicos y comerciales */}
                <div className="flex flex-1 flex-col p-4 space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-medium tracking-tight">{product.attributes.genero}</p>
                    <h4 className="text-sm font-semibold text-medical-dark group-hover:text-primary transition-colors line-clamp-1 font-sans">
                      {product.name}
                    </h4>
                  </div>

                  {/* Badges dinámicos que leen los atributos simulados del JSONB */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-600 rounded">
                      Color: {product.attributes.color}
                    </span>
                    <span className="inline-block px-2 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-600 rounded">
                      Talla base: {product.attributes.talla}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 mt-auto border-t border-slate-50">
                    <span className="text-base font-bold text-medical-dark">${product.price.toFixed(2)}</span>
                    <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Disponible
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