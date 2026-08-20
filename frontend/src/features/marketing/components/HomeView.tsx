import {
  Building2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Truck,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  Shirt,
  Stethoscope,
  Activity,
} from 'lucide-react';
import { COMPANY_INFO } from '../../../config/company.config';

export default function HomeView() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Bioseguridad y Normativa',
      description:
        'Dispositivos y consumibles que cumplen con certificaciones sanitarias y estándares de protección médica.',
    },
    {
      icon: Shirt,
      title: 'Confección Textil Antifluido',
      description:
        'Indumentaria quirúrgica con tecnología repelente a fluidos, costuras de alta resistencia y diseño ergonómico.',
    },
    {
      icon: Truck,
      title: 'Distribución y Despacho Oportuno',
      description:
        'Logística ágil para el abastecimiento de clínicas, consultorios y hospitales en Quito y a nivel nacional.',
    },
    {
      icon: Award,
      title: 'Atención Directa y Personalizada',
      description:
        'Asesoría técnica y cotización inmediata adaptada a los requerimientos específicos de cada centro de salud.',
    },
  ];

  const generalWhatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hola%20${encodeURIComponent(
    COMPANY_INFO.name
  )}%2C%20me%20gustar%C3%ADa%20solicitar%20asesor%C3%ADa%20y%20una%20cotizaci%C3%B3n%20de%20insumos%20y%20ropa%20m%C3%A9dica.`;

  return (
    <div className="space-y-16 py-4">
      {/* ================= HERO SECTION (SPLIT HERO) ================= */}
      <section className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-10 lg:p-12 shadow-xs">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-sky-50/70 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-teal-50/70 blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Columna Izquierda: Mensaje y Acción */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3.5 py-1.5 text-xs font-bold text-primary border border-sky-200 shadow-2xs">
              <Sparkles className="h-3.5 w-3.5" />
              Suministros Clínicos & Confección Especializada
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-medical-dark font-sans leading-tight">
              Equipamiento Médico y{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-teal-600">
                Textiles Quirúrgicos de Vanguardia
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl">
              En <strong className="text-medical-dark font-semibold">{COMPANY_INFO.name}</strong> proveemos
              dispositivos de bioseguridad, instrumental clínico y una línea exclusiva de uniformes médicos con diseño anatómico y tecnología antifluidos.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={generalWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-xs hover:bg-emerald-700 hover:shadow-md transition-all cursor-pointer font-sans"
              >
                <MessageSquare className="h-4 w-4" />
                Cotizar Catálogo por WhatsApp
              </a>
            </div>

            {/* Badges de Garantía Rápida */}
            <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-100 text-xs text-slate-500 font-semibold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Textil Antifluido Premium</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Modelos Anatómicos y Personalizados</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Imagen de Modelo Real */}
          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 shadow-md bg-slate-50 group">
              <img
                src="/images/hero-scrubs.jpeg"
                alt="Colección de uniformes y scrubs médicos anatómicos"
                className="w-full h-auto max-h-110 object-cover object-center transition-transform duration-700 group-hover:scale-103"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `
                    <div class="h-80 flex flex-col items-center justify-center text-slate-400 gap-2 p-6 text-center">
                      <span class="text-sm font-bold">Coloca la imagen en: /public/images/hero-scrubs.jpeg</span>
                    </div>
                  `;
                }}
              />

              {/* Tag Flotante sobre la Imagen */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-white/80 shadow-xs flex items-center justify-between text-xs">
                <div>
                  <span className="block font-bold text-medical-dark font-sans">Línea Temática & Especialidades</span>
                  <span className="block text-[11px] text-slate-500">Fisioterapia • Anatomía • Clínica</span>
                </div>
                <div className="h-8 w-8 rounded-lg bg-sky-50 flex items-center justify-center text-primary">
                  <Activity className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CINTA DE MÉTRICAS / CONFIANZA ================= */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200/80 text-center shadow-2xs">
          <Stethoscope className="h-6 w-6 text-primary mb-2" />
          <span className="text-2xl font-extrabold text-medical-dark font-sans">+70 Insumos</span>
          <span className="text-xs text-slate-400 font-medium mt-0.5">Catálogo hospitalario activo</span>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200/80 text-center shadow-2xs">
          <Shirt className="h-6 w-6 text-primary mb-2" />
          <span className="text-2xl font-extrabold text-medical-dark font-sans">+50 Tonos</span>
          <span className="text-xs text-slate-400 font-medium mt-0.5">Scrubs y prendas médicas</span>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200/80 text-center shadow-2xs">
          <Clock className="h-6 w-6 text-primary mb-2" />
          <span className="text-2xl font-extrabold text-medical-dark font-sans">Atención Ágil</span>
          <span className="text-xs text-slate-400 font-medium mt-0.5">Respuesta y despacho rápido</span>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200/80 text-center shadow-2xs">
          <CheckCircle2 className="h-6 w-6 text-primary mb-2" />
          <span className="text-2xl font-extrabold text-medical-dark font-sans">100% Calidad</span>
          <span className="text-xs text-slate-400 font-medium mt-0.5">Garantía en cada producto</span>
        </div>
      </section>

      {/* ================= PILARES Y PROPUESTA DE VALOR ================= */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Nuestra Garantía</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-medical-dark font-sans">
            ¿Por qué confiar en nosotros?
          </h2>
          <p className="text-sm text-slate-500">
            Aportamos seguridad, durabilidad y confianza en cada suministro entregado a los profesionales de la salud.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-5xl lg:mx-auto">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="flex gap-4.5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-primary border border-sky-100">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-sans text-base font-bold text-medical-dark">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= CANALES DE ATENCIÓN Y MINIMAPA ================= */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs max-w-5xl mx-auto">
        <div className="space-y-6 lg:col-span-1 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Atención Personalizada</span>
              <h2 className="text-2xl font-extrabold tracking-tight text-medical-dark font-sans">
                Canales Directos
              </h2>
              <p className="text-xs text-slate-400">
                Coordinación directa de pedidos, despachos al por mayor e inventario.
              </p>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-surface border border-slate-100">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-medical-dark block">Ubicación Matriz</span>
                  <span>{COMPANY_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-surface border border-slate-100">
                <Phone className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-medical-dark block">Línea Telefónica</span>
                  <span>{COMPANY_INFO.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-surface border border-slate-100">
                <Mail className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="font-bold text-medical-dark block">Correo Corporativo</span>
                  <span className="truncate block">{COMPANY_INFO.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-surface border border-slate-100">
                <Building2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-medical-dark block">Régimen</span>
                  <span>Distribuidora de Insumos & Bioseguridad</span>
                </div>
              </div>
            </div>
          </div>

          <a
            href={generalWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors cursor-pointer w-full text-center mt-6 lg:mt-0 font-sans"
          >
            <MessageSquare className="h-4 w-4" />
            Contactar por WhatsApp
          </a>
        </div>

        <div className="lg:col-span-2 min-h-80 sm:min-h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative group bg-slate-50">
          <iframe
            title={`Ubicación de ${COMPANY_INFO.name}`}
            src={COMPANY_INFO.googleMapsEmbedUrl}
            className="absolute top-0 left-0 w-full h-full border-0"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}