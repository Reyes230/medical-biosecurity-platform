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
  CheckCircle2,
  ArrowRight,
  Heart,
  ChevronRight,
} from 'lucide-react';
import SafeImage from '../../../components/shared/SafeImage';
import { COMPANY_INFO } from '../../../config/company.config';

export default function HomeView() {
  const generalWhatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hola%20${encodeURIComponent(
    COMPANY_INFO.name
  )}%2C%20deseo%20solicitar%20asesor%C3%ADa%20y%20cotizaci%C3%B3n%20de%20uniformes%20e%20insumos%20m%C3%A9dicos.`;

  const serviceCards = [
    {
      title: 'Mandiles, Scrubs y Uniformes',
      subtitle: 'Línea Textil Indumedics',
      description:
        'Confección ergonómica en tela antifluido de alto rendimiento. Diseños anatómicos pensados para resistir jornadas hospitalarias completas.',
      icon: Shirt,
      badge: 'Antifluido Certificado',
      gradient: 'from-emerald-50 via-teal-50/40 to-white',
      border: 'border-emerald-200',
      iconBg: 'bg-emerald-600',
    },
    {
      title: 'Bordados y Confección a Medida',
      subtitle: 'Personalización Institucional',
      description:
        'Bordados computarizados de máxima definición para nombres, especialidades y logotipos de hospitales, clínicas y universidades.',
      icon: Scissors,
      badge: 'Acabado Premium',
      gradient: 'from-sky-50 via-teal-50/40 to-white',
      border: 'border-sky-200',
      iconBg: 'bg-primary',
    },
    {
      title: 'Insumos Médicos Seleccionados',
      subtitle: 'Bioseguridad & Diagnóstico',
      description:
        'Equipos de diagnóstico, material descartable y suministros con registro sanitario para abastecimiento continuo.',
      icon: Stethoscope,
      badge: 'Garantía Sanitaria',
      gradient: 'from-cyan-50 via-blue-50/40 to-white',
      border: 'border-cyan-200',
      iconBg: 'bg-medical-dark',
    },
  ];

  return (
    <div className="space-y-20 pb-12 w-full">
      {/* =========================================================================
          HERO SECTION FULL-WIDTH (RECREACIÓN INTERACTIVA DEL VOLANTE COMERCIAL)
      ========================================================================= */}
      <section className="relative w-full bg-gradient-to-br from-[#061F30] via-[#0B3D5C] to-[#044855] text-white overflow-hidden border-b border-primary/20 shadow-xl">
        {/* Luces y texturas ambientales */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Columna Izquierda: Identidad y Servicios Interactivos */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge de submarca Indumedics */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-emerald-400/30 px-4 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur-md shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span>Línea textil: <strong>Indumedics</strong> — Ropa de trabajo</span>
              </div>

              {/* Título y Slogan */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-sans text-white leading-tight">
                  Medical &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-primary">Biosecurity</span>
                </h1>
                <p className="text-xs sm:text-sm uppercase tracking-widest font-bold text-emerald-200">
                  Salud · Confianza · Siempre Contigo
                </p>
              </div>

              {/* 3 Puntos Clave del Volante */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-3 bg-white/10 border border-white/15 backdrop-blur-md p-3 rounded-2xl hover:bg-white/15 transition-colors">
                  <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
                    <Shirt className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold leading-snug">
                    Mandiles, scrubs y uniformes
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-white/10 border border-white/15 backdrop-blur-md p-3 rounded-2xl hover:bg-white/15 transition-colors">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Scissors className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold leading-snug">
                    Bordados y confección
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-white/10 border border-white/15 backdrop-blur-md p-3 rounded-2xl hover:bg-white/15 transition-colors">
                  <div className="h-10 w-10 rounded-xl bg-teal-500 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold leading-snug">
                    Insumos médicos seleccionados
                  </span>
                </div>
              </div>

              {/* Tag de Audiencia y CTA WhatsApp Interactivo */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={generalWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-4 text-sm font-extrabold text-white shadow-xl hover:bg-primary-dark transition-all duration-200 cursor-pointer font-sans hover:scale-102 active:scale-98"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Escríbenos por WhatsApp</span>
                  <ChevronRight className="h-4 w-4" />
                </a>

                <div className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900/50 border border-white/10 text-xs text-slate-200 font-medium">
                  <GraduationCap className="h-4 w-4 text-emerald-300 shrink-0" />
                  <span>Para estudiantes y profesionales de la salud</span>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Recorte Real de los Médicos con Badges Flotantes */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              {/* Badge Flotante Superior: "Salud hace un mejor mañana" */}
              <div className="absolute -top-4 sm:top-2 right-2 z-20 bg-white/95 backdrop-blur-md text-medical-dark px-4 py-2 rounded-2xl shadow-xl border border-white/80 transform rotate-2">
                <span className="block text-xs sm:text-sm font-extrabold font-sans text-primary">
                  “Salud hace un mejor mañana”
                </span>
              </div>

              {/* Fotografía de Médicos recortada limpiamente */}
              <div className="relative w-full max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-t from-slate-900/60 to-transparent">
                <SafeImage
                  src="/images/marketing/doctors-hero.webp"
                  alt="Equipo Médico - Indumedics Ropa de Trabajo"
                  fallbackText="Fotografía: doctors-hero.webp"
                  className="w-full h-auto object-cover max-h-[460px] drop-shadow-2xl"
                />
              </div>

              {/* Badge Flotante Inferior: "Calidad en cada detalle" */}
              <div className="absolute -bottom-4 sm:bottom-4 left-2 z-20 bg-white/95 backdrop-blur-md text-medical-dark px-4 py-2 rounded-2xl shadow-xl border border-white/80 flex items-center gap-2 transform -rotate-1">
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                <div className="text-[11px] font-extrabold uppercase tracking-wide">
                  Calidad en cada detalle
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          GRANDES TARJETAS DE VALORES (ALTO IMPACTO Y COLOR BLOCKING)
      ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1.5 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Nuestros Pilares
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-medical-dark font-sans tracking-tight">
            Valores que Respaldan Cada Entrega
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Diseñamos soluciones textiles y suministros clínicos basados en principios intransables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tarjeta 1: SALUD */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#063328] via-[#0B3D5C] to-[#061F30] p-8 text-white shadow-lg border border-emerald-500/30 flex flex-col justify-between min-h-72 group hover:shadow-2xl hover:border-emerald-400 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-14 w-14 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                  <HeartHandshake className="h-7 w-7" />
                </div>
                <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-300 uppercase bg-white/10 px-3 py-1 rounded-full border border-white/15">
                  Pilar 01
                </span>
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight font-sans text-white">
                Salud
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Priorizamos la protección del personal y pacientes mediante prendas antifluidos con barrera bacteriológica y consumibles con certificación sanitaria.
              </p>
            </div>
            <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              <span>Bioseguridad hospitalaria estricta</span>
            </div>
          </div>

          {/* Tarjeta 2: CONFIANZA */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#07273B] via-[#0B3D5C] to-[#0E486C] p-8 text-white shadow-lg border border-sky-400/30 flex flex-col justify-between min-h-72 group hover:shadow-2xl hover:border-sky-300 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-14 w-14 rounded-2xl bg-primary/25 text-white border border-primary/40 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                  <ShieldCheck className="h-7 w-7 text-primary" />
                </div>
                <span className="text-[11px] font-mono font-bold tracking-widest text-sky-200 uppercase bg-white/10 px-3 py-1 rounded-full border border-white/15">
                  Pilar 02
                </span>
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight font-sans text-white">
                Confianza
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Materiales de alta durabilidad, costuras reforzadas en cada scrub y relaciones a largo plazo con clínicas, hospitales e instituciones académicas.
              </p>
            </div>
            <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-sky-200">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Garantía de confección Indumedics</span>
            </div>
          </div>

          {/* Tarjeta 3: SIEMPRE CONTIGO */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#04333A] via-[#0B3D5C] to-[#061F30] p-8 text-white shadow-lg border border-teal-400/30 flex flex-col justify-between min-h-72 group hover:shadow-2xl hover:border-teal-300 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-14 w-14 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-400/40 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                  <Sparkles className="h-7 w-7" />
                </div>
                <span className="text-[11px] font-mono font-bold tracking-widest text-teal-300 uppercase bg-white/10 px-3 py-1 rounded-full border border-white/15">
                  Pilar 03
                </span>
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight font-sans text-white">
                Siempre Contigo
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Acompañamiento personalizado, cotizaciones directas por WhatsApp sin intermediarios y despacho oportuno a nivel nacional.
              </p>
            </div>
            <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-teal-300">
              <CheckCircle2 className="h-4 w-4" />
              <span>Respuesta y atención inmediata</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          TRES LÍNEAS DE ESPECIALIDAD (TARJETAS CROMÁTICAS)
      ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
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
                  <span>Explorar detalles</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          CANALES DE ATENCIÓN DIRECTA Y MAPA
      ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          
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
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-medical-dark block">Ubicación Matriz</span>
                    <span>{COMPANY_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <Phone className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-medical-dark block">Teléfono / WhatsApp</span>
                    <span>{COMPANY_INFO.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <Mail className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <span className="font-bold text-medical-dark block">Correo Corporativo</span>
                    <span className="truncate block">{COMPANY_INFO.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <Building2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-medical-dark block">Régimen</span>
                    <span>Distribución de Insumos &amp; Confección Indumedics</span>
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

        </div>
      </section>
    </div>
  );
}