import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { COMPANY_INFO } from '../../../config/company.config';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, clearCart, subtotal } =
    useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('Quito');
  const [customerTaxId, setCustomerTaxId] = useState('');

  if (!isCartOpen) return null;

  const handleSendOrder = () => {
    if (items.length === 0) return;

    let message = `Hola *${COMPANY_INFO.name}*, deseo solicitar la cotización del siguiente pedido:\n\n`;

    items.forEach((item, index) => {
      const attributesFormatted = item.attributes && Object.keys(item.attributes).length > 0
        ? ` (${Object.entries(item.attributes)
            .map(([k, v]) => `${k}: ${v}`)
            .join(' | ')})`
        : '';

      message += `${index + 1}. *${item.quantity}x* ${item.productName}${attributesFormatted}\n`;
      message += `   • SKU: \`${item.sku}\` | Ref: $${(item.price * item.quantity).toFixed(2)} USD\n\n`;
    });

    message += `*Total Estimado:* $${subtotal.toFixed(2)} USD\n`;
    message += `--------------------------------\n`;
    if (customerName.trim()) message += `*Cliente/Institución:* ${customerName.trim()}\n`;
    if (customerCity.trim()) message += `*Ciudad/Destino:* ${customerCity.trim()}\n`;
    if (customerTaxId.trim()) message += `*RUC/Cédula Factura:* ${customerTaxId.trim()}\n`;

    const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-sky-50 flex items-center justify-center text-primary border border-sky-100">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-medical-dark font-sans">Bolsa de Pedido</h3>
                <p className="text-[11px] text-slate-400">Cotización directa sin registro previo</p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm font-bold text-medical-dark">Tu bolsa está vacía</p>
                  <p className="text-xs text-slate-400 mt-0.5">Explora el catálogo para añadir insumos o prendas.</p>
                </div>
                <button
                  onClick={closeCart}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-sky-700 pt-2 cursor-pointer"
                >
                  Continuar explorando &rarr;
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.variantId}
                  className="rounded-xl border border-slate-200/80 bg-surface/50 p-3.5 space-y-2 relative"
                >
                  <div className="flex justify-between items-start gap-2 pr-6">
                    <div>
                      <h4 className="text-xs font-bold text-medical-dark font-sans leading-tight">
                        {item.productName}
                      </h4>
                      <p className="text-[10px] font-mono text-slate-400 mt-0.5">{item.sku}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.variantId)}
                      className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors p-1 cursor-pointer"
                      title="Eliminar ítem"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {item.attributes && Object.keys(item.attributes).length > 0 && (
                    <div className="flex flex-wrap gap-1 text-[10px] text-slate-500 font-medium">
                      {Object.entries(item.attributes).map(([k, v]) => (
                        <span key={k} className="bg-white px-1.5 py-0.5 rounded border border-slate-100">
                          {k}: <strong className="text-slate-700">{v}</strong>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-bold font-mono px-2 text-medical-dark">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="text-right font-sans">
                      <span className="text-xs font-extrabold text-medical-dark">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold ml-1">USD</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Form */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-white space-y-4 shadow-lg">
              <div className="space-y-2 p-3 bg-surface rounded-xl border border-slate-100 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[11px] text-slate-600">Datos de Despacho (Opcional)</span>
                  <button
                    onClick={clearCart}
                    className="text-[10px] text-red-500 hover:underline font-semibold cursor-pointer"
                  >
                    Vaciar todo
                  </button>
                </div>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nombre / Clínica / Contacto"
                  className="w-full rounded-md border border-slate-200 px-2.5 py-1.5 text-xs bg-white focus:outline-hidden focus:border-primary"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    placeholder="Ciudad de Envío"
                    className="w-full rounded-md border border-slate-200 px-2.5 py-1.5 text-xs bg-white focus:outline-hidden focus:border-primary"
                  />
                  <input
                    type="text"
                    value={customerTaxId}
                    onChange={(e) => setCustomerTaxId(e.target.value)}
                    placeholder="RUC o Cédula"
                    className="w-full rounded-md border border-slate-200 px-2.5 py-1.5 text-xs bg-white focus:outline-hidden focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Subtotal Estimado:
                </span>
                <span className="text-xl font-extrabold text-medical-dark font-sans">
                  ${subtotal.toFixed(2)} <span className="text-xs font-bold text-slate-400">USD</span>
                </span>
              </div>

              <button
                onClick={handleSendOrder}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition-colors cursor-pointer font-sans"
              >
                <MessageSquare className="h-4 w-4" />
                Enviar Pedido por WhatsApp
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] font-semibold text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Atención y confirmación inmediata con el negocio</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}