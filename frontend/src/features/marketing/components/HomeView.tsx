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
        'Confección ergonómica en tela antifluido de alto desempeño. Diseños anatómicos pensados para jornadas hospitalarias intensivas.',
      icon: Shirt,
      badge: 'Antifluido Certificado',
    },
    {
      title: 'Bordados y Confección a Medida',
      subtitle: 'Personalización Institucional',
      description:
        'Bordados de precisión para nombres, cargos y logotipos corporativos de clínicas, hospitales o facultades de salud.',
      icon: Scissors,
      badge: 'Acabado Premium',
    },
    {
      title: 'Insumos Médicos Seleccionados',
      subtitle: 'Bioseguridad & Diagnóstico',
      description:
        'Equipos de diagnóstico, material descartable y suministros con registro sanitario para abastecimiento continuo.',
      icon: Stethoscope,
      badge: 'Garantía Sanitaria',
    },
  ];

  return (
    <div className="space-y-16 py-2">
      {/* ================= HERO COMERCIAL CON BANNER OFICIAL ================= */}
      <section className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/80 shadow-md">
        <div className="relative w-full overflow-hidden bg-medical-dark flex items-center justify-center">
          <SafeImage
            src="/images/marketing/hero-banner-doctors.webp"
            alt="Medical & Biosecurity - Indumedics Ropa de Trabajo"
            fallbackText="Banner Comercial: Coloca hero-banner-doctors.webp en /public/images/marketing/"
            className="w-full h-auto object-cover max-h-[520px]"
          />
        </div>

        {/* Franja de Conversión Rápida */}
        <div className="bg-gradient-to-r from-medical-dark via-[#0F4C6E] to-primary p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <GraduationCap className="h-4 w-4 text-emerald-300" />
              <span>Para estudiantes y profesionales de la salud</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-sans">
              "Salud hace un mejor mañana"
            </h2>
            <p className="text-xs sm:text-sm text-slate-200">
              Atención directa en Quito y despacho ágil a todo el país.
            </p>
          </div>

          <a
            href={generalWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white px-6 py-3.5 text-sm font-extrabold text-medical-dark shadow-md hover:bg-slate-50 transition-all cursor-pointer font-sans shrink-0 hover:scale-102"
          >
            <MessageSquare className="h-4 w-4 text-emerald-600" />
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>

      {/* ================= CINTA DE VALORES CORPORATIVOS ================= */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
            <HeartHandshake className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-sm text-medical-dark uppercase tracking-wider">Salud</h4>
            <p className="text-xs text-slate-500 mt-0.5">Compromiso con el bienestar y la protección médica.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-sm text-medical-dark uppercase tracking-wider">Confianza</h4>
            <p className="text-xs text-slate-500 mt-0.5">Materiales certificados y durabilidad en cada prenda.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-sm text-medical-dark uppercase tracking-wider">Siempre Contigo</h4>
            <p className="text-xs text-slate-500 mt-0.5">Asesoría ágil y acompañamiento permanente.</p>
          </div>
        </div>
      </section>

      {/* ================= TRES LÍNEAS DE ESPECIALIDAD ================= */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Líneas de Especialidad
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-medical-dark font-sans">
            Soluciones Integrales para el Sector Sanitario
          </h2>
          <p className="text-sm text-slate-500">
            Confección textil de alta durabilidad y distribución especializada de consumibles clínicos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {serviceCards.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs hover:shadow-lg hover:border-primary/40 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary group-hover:scale-105 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                      {service.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                      {service.subtitle}
                    </span>
                    <h3 className="font-sans text-lg font-bold text-medical-dark mt-0.5">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-2">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary">
                  <span>Conocer especificaciones</span>
                  <span>&rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= CANALES DE ATENCIÓN Y UBICACIÓN ================= */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs max-w-6xl mx-auto">
        <div className="space-y-6 lg:col-span-1 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Atención Corporativa & Al Por Mayor
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-medical-dark font-sans">
                Canales Directos
              </h2>
              <p className="text-xs text-slate-500">
                Punto de distribución y cotización de dotaciones para hospitales y centros clínicos.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
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
                  <span className="font-bold text-medical-dark block">Teléfono / WhatsApp</span>
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
                  <span>Distribución de Insumos & Confección Indumedics</span>
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

        <div className="lg:col-span-2 min-h-80 sm:min-h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative bg-slate-50">
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