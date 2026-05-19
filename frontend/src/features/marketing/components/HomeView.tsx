// src/features/marketing/components/HomeView.tsx
import { Building2, Mail, MapPin, MessageSquareText, Phone, ShieldCheck, Truck } from 'lucide-react';
import { COMPANY_INFO } from '../../../config/company.config';

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

  // Enlace dinámico optimizado con el mensaje corporativo real para el dueño
  const generalWhatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hola%20${encodeURIComponent(COMPANY_INFO.name)}%2C%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20y%20una%20cotizaci%C3%B3n%20de%20cat%C3%A1logo.`;

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
          En <span className="font-semibold text-primary">{COMPANY_INFO.name}</span> nos especializamos en la provisión de insumos médicos certificados y el diseño de indumentaria profesional que combina seguridad, ergonomía y un estilo impecable.
        </p>
      </section>

      {/* Valores de la Empresa */}
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

      {/* SECCIÓN INTERACTIVA: Contacto, WhatsApp y Minimapa */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3 bg-white border border-slate-200 rounded-2xl p-8 shadow-xs max-w-5xl mx-auto">
        
        {/* Canales Directos Reales */}
        <div className="space-y-6 lg:col-span-1 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-bold tracking-tight text-medical-dark font-sans">Canales de Atención</h2>
              <p className="text-xs text-slate-400">Coordinación directa de pedidos e inventario con gerencia.</p>
            </div>

            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>{COMPANY_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="truncate">{COMPANY_INFO.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-primary shrink-0" />
                <span>Matriz Local de Suministros</span>
              </div>
            </div>
          </div>

          {/* Botón a WhatsApp Corporativo */}
          <a
            href={generalWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors cursor-pointer w-full text-center mt-6 lg:mt-0 font-sans"
          >
            <MessageSquareText className="h-5 w-5" />
            Contactar al Jefe vía WhatsApp
          </a>
        </div>

        {/* El Minimapa Responsivo con URL de Configuración */}
        <div className="lg:col-span-2 h-72 lg:h-full min-h-[280px] rounded-xl overflow-hidden border border-slate-100 shadow-inner relative group bg-slate-50">
          <iframe
            title={`Ubicación de ${COMPANY_INFO.name}`}
            src={COMPANY_INFO.googleMapsEmbedUrl}
            className="absolute top-0 left-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </section>
    </div>
  );
}