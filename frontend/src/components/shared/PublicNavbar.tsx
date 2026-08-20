import { useState } from 'react';
import {
  ShieldCheck,
  Shirt,
  Stethoscope,
  Users,
  Menu,
  X,
  MessageSquare,
} from 'lucide-react';
import { COMPANY_INFO } from '../../config/company.config';

interface PublicNavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function PublicNavbar({ currentTab, onTabChange }: PublicNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Quiénes Somos', icon: Users },
    { id: 'clothing', label: 'Ropa Médica', icon: Shirt },
    { id: 'supplies', label: 'Insumos y Equipos', icon: Stethoscope },
  ];

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    setIsMobileMenuOpen(false);
  };

  const quickWhatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hola%20${encodeURIComponent(
    COMPANY_INFO.name
  )}%2C%20quisiera%20consultar%20sobre%20su%20cat%C3%A1logo%20disponible.`;

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-md shadow-2xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Logo & Identidad */}
          <button
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-teal-500 text-white shadow-2xs group-hover:scale-105 transition-transform">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <span className="block font-sans text-base font-extrabold tracking-tight text-medical-dark leading-tight">
                Medical & Biosecurity
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Suministros & Textiles
              </span>
            </div>
          </button>

          {/* Menú Desktop */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-primary shadow-2xs border border-slate-200/60'
                      : 'text-slate-500 hover:text-medical-dark hover:bg-white/50'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Botón WhatsApp Desktop & Trigger Móvil */}
          <div className="flex items-center gap-3">
            <a
              href={quickWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-2xs hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Cotizar Inmediato
            </a>

            {/* Toggle Móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-white p-4 space-y-2 animate-in slide-in-from-top-2 duration-200 shadow-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-sky-50 text-primary border border-sky-100'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className="h-4 w-4 text-primary" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-2">
            <a
              href={quickWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-2xs hover:bg-emerald-700 transition-colors text-center"
            >
              <MessageSquare className="h-4 w-4" /> Cotizar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}