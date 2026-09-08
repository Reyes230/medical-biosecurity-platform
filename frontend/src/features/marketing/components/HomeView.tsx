import {
  Scissors,
  Shirt,
  Stethoscope,
  MessageSquare,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Building2,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import SafeImage from '../../../components/shared/SafeImage';
import { COMPANY_INFO } from '../../../config/company.config';

export default function HomeView() {
  const generalWhatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hola%20${encodeURIComponent(
    COMPANY_INFO.name
  )}%2C%20deseo%20solicitar%20asesor%C3%ADa%20y%20cotizaci%C3%B3n%20sobre%20uniformes%20e%20insumos.`;

  const serviceCards = [
    {
      title: 'Mandiles, Scrubs y Uniformes',
      subtitle: 'Línea Textil Indumedics',
      description:
        'Confección ergonómica en tela antifluido de alto rendimiento. Diseños anatómicos pensados para resistir jornadas hospitalarias completas.',
      icon: Shirt,
      badge: 'Antifluido Certificado',
      gradient: 'from-emerald-50 via-teal-50/40 to-white',
      border: 'border-emerald-200/80',
      iconBg: 'bg-emerald-600',
    },
    {
      title: 'Bordados y Confección a Medida',
      subtitle: 'Personalización Institucional',
      description:
        'Bordados computarizados de máxima definición para nombres, especialidades y escudos de hospitales, clínicas o universidades.',
      icon: Scissors,
      badge: 'Acabado Premium',
      gradient: 'from-sky-50 via-teal-50/40 to-white',
      border: 'border-sky-200/80',
      iconBg: 'bg-primary',
    },
    {
      title: 'Insumos Médicos Seleccionados',
      subtitle: 'Bioseguridad & Diagnóstico',
      description:
        'Equipos de diagnóstico, material descartable y suministros médicos con registro sanitario para abastecimiento continuo de consultorios.',
      icon: Stethoscope,
      badge: 'Garantía Sanitaria',
      gradient: 'from-cyan-50 via-blue-50/40 to-white',
      border: 'border-cyan-200/80',
      iconBg: 'bg-medical-dark',
    },
  ];

  return (
    <div className="space-y-16 py-2">
      {/* ================= HERO COMERCIAL ================= */}
      <section className="relative overflow-hidden rounded-3xl bg-[#0B3D5C] border border-[#0F4C6E] shadow-xl">
        <div className="relative w-full overflow-hidden bg-slate-900 flex items-center justify-center">
          <SafeImage
            src="/images/marketing/hero-banner-doctors.webp"
            alt="Medical & Biosecurity - Indumedics Ropa de Trabajo"
            fallbackText="Banner Comercial: Coloca hero-banner-doctors.webp en /public/images/marketing/"
            className="w-full h-auto object-cover max-h-[520px]"
          />
        </div>

        {/* Franja de Conversión en Degradado Teal-Marino */}
        <div className="bg-gradient-to-r from-[#07273B] via-[#0B3D5C] to-[#00987A] p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 border border-primary/40 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md">
              <GraduationCap className="h-4 w-4" />
              <span>Para estudiantes y profesionales de la salud</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans text-white">
              "Salud hace un mejor mañana"
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
              Equipamiento clínico y uniformes antifluidos con atención directa en Quito y envíos a todo Ecuador.
            </p>
          </div>

          <a
            href={generalWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-primary px-7 py-4 text-sm font-extrabold text-white shadow-lg hover:bg-primary-dark transition-all cursor-pointer font-sans shrink-0 hover:scale-105 active:scale-95"
          >
            <MessageSquare className="h-5 w-5" />
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>

      {/* ================= CINTA DE VALORES EN AZUL MARINO (COLOR BLOCKING) ================= */}
      <section className="bg-gradient-to-r from-[#07273B] to-[#0B3D5C] rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-slate-700/50">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-700/60">
          <div className="flex items-center gap-4 sm:pr-4 pt-2 sm:pt-0">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary border border-primary/30">
              <HeartHandshake className="h-7 w-7 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider">Salud</h4>
              <p className="text-xs text-slate-300 mt-1 leading-snug">Compromiso real con la protección del personal sanitario.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:px-6 pt-4 sm:pt-0">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary border border-primary/30">
              <ShieldCheck className="h-7 w-7 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider">Confianza</h4>
              <p className="text-xs text-slate-300 mt-1 leading-snug">Materiales certificados, costuras reforzadas y alta durabilidad.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:pl-6 pt-4 sm:pt-0">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary border border-primary/30">
              <Sparkles className="h-7 w-7 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider">Siempre Contigo</h4>
              <p className="text-xs text-slate-300 mt-1 leading-snug">Asesoría ágil en pedidos personalizados y cotizaciones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRES LÍNEAS DE ESPECIALIDAD (TARJETAS CROMÁTICAS) ================= */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-md border border-primary/30">
            Líneas de Especialidad
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-medical-dark font-sans">
            Soluciones Integrales para el Sector Sanitario
          </h2>
          <p className="text-sm text-slate-600">
            Unificamos confección textil médica avanzada con distribución directa de insumos clínicos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {serviceCards.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`flex flex-col justify-between rounded-3xl border ${service.border} bg-gradient-to-b ${service.gradient} p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${service.iconBg} text-white shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white text-medical-dark border border-slate-200 shadow-2xs">
                      {service.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                      {service.subtitle}
                    </span>
                    <h3 className="font-sans text-lg font-bold text-medical-dark mt-1">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2.5">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-5 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-medical-dark group-hover:text-primary transition-colors">
                  <span>Explorar catálogo</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= CANALES DE ATENCIÓN ================= */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm max-w-6xl mx-auto">
        <div className="space-y-6 lg:col-span-1 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary-light px-2.5 py-0.5 rounded-md border border-primary/20">
                Atención Corporativa & Al Por Mayor
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-medical-dark font-sans">
                Canales Directos
              </h2>
              <p className="text-xs text-slate-500">
                Punto de distribución y cotización de dotaciones para hospitales, clínicas y facultades.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-medical-dark block">Ubicación Matriz</span>
                  <span>{COMPANY_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <Phone className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-medical-dark block">Teléfono / WhatsApp</span>
                  <span>{COMPANY_INFO.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <Mail className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="font-bold text-medical-dark block">Correo Corporativo</span>
                  <span className="truncate block">{COMPANY_INFO.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <Building2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-medical-dark block">Régimen</span>
                  <span>Distribución de Insumos & Confección Indumedics</span>
                </div>
              </div>
            </div>
          </div>

          <a
            href={generalWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition-colors cursor-pointer w-full text-center mt-6 lg:mt-0 font-sans hover:scale-102"
          >
            <MessageSquare className="h-4 w-4" />
            Contactar por WhatsApp
          </a>
        </div>

        <div className="lg:col-span-2 min-h-80 sm:min-h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative bg-slate-100">
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