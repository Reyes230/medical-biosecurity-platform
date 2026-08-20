import { useEffect } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerProductSchema, type RegisterProductFormData } from '../schemas/product.schema';
import { useProductMutations } from '../hooks/useProductMutations';
import type { ProductCatalogResponse } from '../types/product.types';
import { Plus, Save, Trash2, Loader2, ArrowLeft } from 'lucide-react';

interface AdminProductFormProps {
  productToEdit?: ProductCatalogResponse | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AdminProductForm({ productToEdit, onSuccess, onCancel }: AdminProductFormProps) {
  const { createProduct, updateProduct } = useProductMutations();
  const isEditing = Boolean(productToEdit);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RegisterProductFormData>({
    resolver: zodResolver(registerProductSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      basePrice: 1,
      variants: [{ sku: '', price: 1, stock: 1, attributes: {} }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'variants' });
  const productCategory = useWatch({ control, name: 'category' });

  useEffect(() => {
    if (productToEdit) {
      reset({
        name: productToEdit.name,
        description: productToEdit.description,
        category: productToEdit.category,
        basePrice: productToEdit.variants[0]?.basePrice || 1,
        variants: productToEdit.variants.map((v) => ({
          sku: v.sku,
          price: v.basePrice,
          stock: 1,
          attributes: v.attributes || {},
        })),
      });
    }
  }, [productToEdit, reset]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setValue('category', category);

    if (category === 'Ropa Médica') {
      setValue('variants.0.attributes', { Color: '', Talla: '', Tela: '', Genero: '' });
    } else {
      setValue('variants.0.attributes', { presentacion: '', certificacion: '' });
    }
  };

  const isSubmitting = createProduct.isPending || updateProduct.isPending;

  const onSubmitForm = async (data: RegisterProductFormData) => {
    try {
      if (isEditing && productToEdit) {
        await updateProduct.mutateAsync({
          id: productToEdit.id,
          data: {
            name: data.name,
            description: data.description,
            category: data.category,
            variants: data.variants.map((v, index) => ({
              id: productToEdit.variants[index]?.id,
              sku: v.sku,
              basePrice: v.price,
              currency: 'USD',
              attributes: v.attributes,
            })),
          },
        });
      } else {
        const firstVariant = data.variants[0];
        await createProduct.mutateAsync({
          name: data.name,
          description: data.description,
          category: data.category,
          sku: firstVariant.sku,
          basePrice: firstVariant.price,
          currency: 'USD',
          attributes: firstVariant.attributes,
        });
      }
      onSuccess();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      alert(`Error al procesar el producto: ${message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-medical-dark font-sans">
            {isEditing ? `Editar Producto: ${productToEdit?.name}` : 'Registrar Nuevo Producto'}
          </h3>
          <p className="text-xs text-slate-400">Panel administrativo con persistencia directa en PostgreSQL.</p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Cancelar
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs font-bold text-slate-500">Nombre del Producto</label>
            <input
              type="text"
              {...register('name')}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-surface focus:outline-hidden focus:border-primary"
            />
            {errors.name && <p className="text-[11px] text-red-500 font-medium">{errors.name.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Precio Base ($)</label>
            <input
              type="number"
              step="0.01"
              {...register('basePrice', { valueAsNumber: true })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-surface focus:outline-hidden focus:border-primary"
            />
            {errors.basePrice && <p className="text-[11px] text-red-500 font-medium">{errors.basePrice.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Categoría</label>
            <select
              value={productCategory || ''}
              onChange={handleCategoryChange}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-surface focus:outline-hidden focus:border-primary cursor-pointer"
            >
              <option value="">-- Seleccione una Categoría --</option>
              <option value="Ropa Médica">Ropa Médica</option>
              <option value="Insumos Médicos">Insumos Médicos</option>
              <option value="Desinfección">Desinfección</option>
              <option value="Protección Personal">Protección Personal</option>
              <option value="Equipos Médicos">Equipos Médicos</option>
              <option value="Equipos Respiratorios">Equipos Respiratorios</option>
              <option value="Empaques y Dispensadores">Empaques y Dispensadores</option>
              <option value="Instrumental Médico">Instrumental Médico</option>
              <option value="Cuidado Personal">Cuidado Personal</option>
              <option value="Ropa Hospitalaria">Ropa Hospitalaria</option>
            </select>
            {errors.category && <p className="text-[11px] text-red-500 font-medium">{errors.category.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Descripción Técnica</label>
            <input
              type="text"
              {...register('description')}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-surface focus:outline-hidden focus:border-primary"
              placeholder="Presentación, características, normativas..."
            />
            {errors.description && <p className="text-[11px] text-red-500 font-medium">{errors.description.message}</p>}
          </div>
        </div>

        {/* Sección de Variantes */}
        <div className="space-y-4 border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">
              Variantes y Atributos JSONB
            </h4>
            <button
              type="button"
              onClick={() =>
                append({
                  sku: '',
                  price: 1,
                  stock: 1,
                  attributes:
                    productCategory === 'Ropa Médica'
                      ? { Color: '', Talla: '', Tela: '', Genero: '' }
                      : { presentacion: '', certificacion: '' },
                })
              }
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-sky-700 cursor-pointer"
            >
              <Plus className="h-3 w-3" /> Añadir Variante
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 rounded-xl border border-slate-100 bg-surface/50 space-y-3 relative">
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-red-500 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-500">SKU</label>
                    <input
                      type="text"
                      {...register(`variants.${index}.sku`)}
                      className="w-full rounded-md border border-slate-200 px-2.5 py-1.5 text-xs bg-white focus:outline-hidden focus:border-primary uppercase font-mono"
                      placeholder="MED-PROD-001"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-500">Precio Variante ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      {...register(`variants.${index}.price`, { valueAsNumber: true })}
                      className="w-full rounded-md border border-slate-200 px-2.5 py-1.5 text-xs bg-white focus:outline-hidden focus:border-primary"
                    />
                  </div>
                </div>

                {/* Sub-bloque de Atributos */}
                <div className="bg-white p-3 rounded-lg border border-slate-100 space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Atributos Dinámicos</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {productCategory === 'Ropa Médica' ? (
                      <>
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-500 font-medium">Color</label>
                          <input type="text" {...register(`variants.${index}.attributes.Color`)} className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs bg-surface" placeholder="Azul Marino" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-500 font-medium">Talla</label>
                          <input type="text" {...register(`variants.${index}.attributes.Talla`)} className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs bg-surface" placeholder="M" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-500 font-medium">Tela</label>
                          <input type="text" {...register(`variants.${index}.attributes.Tela`)} className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs bg-surface" placeholder="Antifluido" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-500 font-medium">Género</label>
                          <input type="text" {...register(`variants.${index}.attributes.Genero`)} className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs bg-surface" placeholder="Unisex" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-500 font-medium">Presentación</label>
                          <input type="text" {...register(`variants.${index}.attributes.presentacion`)} className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs bg-surface" placeholder="Caja x 100u" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-500 font-medium">Certificación</label>
                          <input type="text" {...register(`variants.${index}.attributes.certificacion`)} className="w-full rounded-md border border-slate-200 px-2 py-1 text-xs bg-surface" placeholder="FDA / CE" />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-sky-700 disabled:opacity-50 transition-colors cursor-pointer font-sans"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Guardando cambios...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> {isEditing ? 'Guardar Cambios' : 'Registrar Producto'}
            </>
          )}
        </button>
      </form>
    </div>
  );
}