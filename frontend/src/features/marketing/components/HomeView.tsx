// src/features/marketing/components/HomeView.tsx
import { Building2, Mail, MapPin, Phone, ShieldCheck, Truck } from 'lucide-react';

export default function HomeView() {
  const coreValues = [
    {
      icon: ShieldCheck,
      title: 'Certificación Garantizada',
      description: 'Todos nuestros productos cumplen con normativas sanitarias estrictas y estándares internacionales de bioseguridad.',
    },
    {
      icon: Truck,
      title: 'Distribución Eficiente',
      description: 'Logística optimizada para el abastecimiento oportuno de clínicas, hospitales y profesionales de la salud en Quito y a nivel nacional.',
    },
  ];

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto py-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-primary border border-sky-200">
          Protección de Grado Médico
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-medical-dark sm:text-5xl font-sans">
          Equipamiento y Textiles Quirúrgicos de Alta Gama
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed">
          En <span className="font-semibold text-primary">Medical & Biosecurity</span> nos especializamos en la provisión de insumos médicos certificados y el diseño de indumentaria profesional que combina seguridad, ergonomía y un estilo impecable.
        </p>
      </section>

      {/* Quiénes Somos / Valores */}
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:max-w-5xl lg:mx-auto">
        {coreValues.map((value, index) => {
          const Icon = value.icon;
          return (
            <div key={index} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-primary border border-sky-100">
                <Icon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-sans text-base font-semibold text-medical-dark">{value.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{value.description}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Contacto e Información Local */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3 bg-white border border-slate-200 rounded-2xl p-8 shadow-xs max-w-5xl mx-auto">
        {/* Info de la Empresa */}
        <div className="space-y-6 lg:col-span-1">
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tight text-medical-dark font-sans">Contáctanos</h2>
            <p className="text-xs text-slate-400">Solicita cotizaciones al por mayor o agendas de exhibición.</p>
          </div>

          <div className="space-y-4 text-sm text-slate-600">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span>Quito, Pichincha, Ecuador</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary shrink-0" />
              <span>+593 98 030 7694</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <span>contacto@medbiosecurity.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-primary shrink-0" />
              <span>Matriz Local de Suministros</span>
            </div>
          </div>
        </div>

        {/* Formulario de Contacto Rápido */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 lg:col-span-2 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Nombre Completo</label>
              <input type="text" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-hidden bg-surface" placeholder="Ej. Dr. Alejandro Reyes" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Institución / Clínica</label>
              <input type="text" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-hidden bg-surface" placeholder="Ej. Hospital Metropolitano" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500">Mensaje o Requerimiento</label>
            <textarea rows={3} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-hidden bg-surface resize-none" placeholder="Detalla los insumos o tallas de ropa médica que requieres cotizar..."></textarea>
          </div>
          <button type="submit" className="inline-flex justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-sky-700 transition-colors cursor-pointer w-full sm:w-auto">
            Enviar Mensaje
          </button>
        </form>
      </section>
    </div>
  );
}