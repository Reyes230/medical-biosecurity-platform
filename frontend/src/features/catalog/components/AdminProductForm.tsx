// src/features/catalog/components/AdminProductForm.tsx
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerProductSchema, type RegisterProductFormData } from '../schemas/product.schema';
import { Plus, Save, Trash2 } from 'lucide-react';

export default function AdminProductForm() {
  const [productCategory, setProductCategory] = useState<string>('');

  const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<RegisterProductFormData>({
    resolver: zodResolver(registerProductSchema),
    defaultValues: {
      name: '', description: '', category: '', basePrice: 1,
      variants: [{ sku: '', price: 1, stock: 1, attributes: {} }]
    }
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'variants' });

  // Manejador del cambio de categoría para inyectar llaves JSONB específicas
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setProductCategory(category);
    setValue('category', category);
    
    // Inyección de atributos sugeridos según el modelo de negocio
    if (category === 'Ropa Médica') {
      setValue('variants.0.attributes', { color: '', talla: '', tela: '', genero: '' });
    } else {
      setValue('variants.0.attributes', { certificacion: '', empaque: '' });
    }
  };

  const onSubmitForm = (data: RegisterProductFormData) => {
    console.log('Payload Sanitizado y Validado listo para enviar a Spring Boot:', data);
    alert('Payload seguro validado por Zod. Listo para persistir en PostgreSQL via Docker.');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-lg font-bold text-medical-dark font-sans">Panel Operativo: Registro de Inventario</h3>
        <p className="text-xs text-slate-400">Filtro de seguridad Zod activo. Los datos se validan antes de la transmisión HTTP.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        {/* Bloque Global Estático */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs font-bold text-slate-500">Nombre del Producto / Uniforme</label>
            <input type="text" {...register('name')} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-surface focus:outline-hidden focus:border-primary" />
            {errors.name && <p className="text-[11px] text-red-500 font-medium">{errors.name.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Precio Base ($)</label>
            <input type="number" step="0.01" {...register('basePrice', { valueAsNumber: true })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-surface focus:outline-hidden focus:border-primary" />
            {errors.basePrice && <p className="text-[11px] text-red-500 font-medium">{errors.basePrice.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Categoría Estratégica</label>
            <select onChange={handleCategoryChange} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-surface focus:outline-hidden focus:border-primary cursor-pointer">
              <option value="">-- Seleccione un Sector --</option>
              <option value="Ropa Médica">Ropa Médica (Línea Textil)</option>
              <option value="Insumos Clínicos">Insumos Clínicos (Consumibles)</option>
              <option value="Equipos de Diagnóstico">Equipos de Diagnóstico</option>
            </select>
            {errors.category && <p className="text-[11px] text-red-500 font-medium">{errors.category.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Descripción Técnica</label>
            <input type="text" {...register('description')} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-surface focus:outline-hidden focus:border-primary" placeholder="Detalles de empaque, hilos o normativas..." />
            {errors.description && <p className="text-[11px] text-red-500 font-medium">{errors.description.message}</p>}
          </div>
        </div>

        {/* Sección Dinámica de Variantes e Inyección de Atributos JSONB */}
        <div className="space-y-4 border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">Configuración de Variantes y Stock Inicial</h4>
            <button type="button" onClick={() => append({ sku: '', price: 1, stock: 1, attributes: productCategory === 'Ropa Médica' ? { color: '', talla: '', tela: '', genero: '' } : { certificacion: '', empaque: '' } })} className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-sky-700 cursor-pointer">
              <Plus className="h-3 w-3" /> Añadir Variante
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 rounded-xl border border-slate-100 bg-surface/50 space-y-3 relative">
                {fields.length > 1 && (
                  <button type="button" onClick={() => remove(index)} className="absolute top-3 right-3 text-slate-400 hover:text-red-500 cursor-pointer">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-500">SKU Correlativo</label>
                    <input type="text" {...register(`variants.${index}.sku`)} className="w-full rounded-md border border-slate-200 px-2.5 py-1.5 text-xs bg-white focus:outline-hidden focus:border-primary uppercase" placeholder="MED-SCRUB-AZL-S" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-500">Precio de Variante ($)</label>
                    <input type="number" step="0.01" {...register(`variants.${index}.price`, { valueAsNumber: true })} className="w-full rounded-md border border-slate-200 px-2.5 py-1.5 text-xs bg-white focus:outline-hidden focus:border-primary" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-500">Stock de Apertura</label>
                    <input type="number" {...register(`variants.${index}.stock`, { valueAsNumber: true })} className="w-full rounded-md border border-slate-200 px-2.5 py-1.5 text-xs bg-white focus:outline-hidden focus:border-primary" />
                  </div>
                </div>

                {/* Sub-bloque Dinámico: Atributos mapeados al JSONB de Postgres */}
                <div className="bg-white p-3 rounded-lg border border-slate-100 space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Atributos del Mapa Dinámico (JSONB)</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {productCategory === 'Ropa Médica' ? (
                      <>
                        <div className="space-y-1"><label className="text-[10px] text-slate-500 font-medium">Color</label><input type="text" {...register(`variants.${index}.attributes.color`)} className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs bg-surface" placeholder="Azul" /></div>
                        <div className="space-y-1"><label className="text-[10px] text-slate-500 font-medium">Talla</label><input type="text" {...register(`variants.${index}.attributes.talla`)} className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs bg-surface" placeholder="M" /></div>
                        <div className="space-y-1"><label className="text-[10px] text-slate-500 font-medium">Tela</label><input type="text" {...register(`variants.${index}.attributes.tela`)} className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs bg-surface" placeholder="Antifluido" /></div>
                        <div className="space-y-1"><label className="text-[10px] text-slate-500 font-medium">Género</label><input type="text" {...register(`variants.${index}.attributes.genero`)} className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs bg-surface" placeholder="Unisex" /></div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-1"><label className="text-[10px] text-slate-500 font-medium">Certificación</label><input type="text" {...register(`variants.${index}.attributes.certificacion`)} className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs bg-surface" placeholder="FDA / CE" /></div>
                        <div className="space-y-1"><label className="text-[10px] text-slate-500 font-medium">Presentación</label><input type="text" {...register(`variants.${index}.attributes.empaque`)} className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs bg-surface" placeholder="Caja x 50 u." /></div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-sky-700 transition-colors cursor-pointer font-sans">
          <Save className="h-4 w-4" /> Registrar e Inicializar Inventario
        </button>
      </form>
    </div>
  );
}