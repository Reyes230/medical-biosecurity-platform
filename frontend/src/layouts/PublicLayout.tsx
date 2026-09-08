import type { ReactNode } from 'react';
import PublicNavbar from '../components/shared/PublicNavbar';
import { Lock, LogOut, Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../config/company.config';

interface PublicLayoutProps {
  children: ReactNode;
  currentTab: string;
  onTabChange: (tab: string) => void;
  isAdminAuthenticated: boolean;
  onOpenLoginModal: () => void;
  onLogout: () => void;
}

export default function PublicLayout({
  children,
  currentTab,
  onTabChange,
  isAdminAuthenticated,
  onOpenLoginModal,
  onLogout,
}: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100/70 text-medical-dark relative selection:bg-primary selection:text-white">
      {/* Luz ambiental sutil de fondo para eliminar el plano blanco */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-primary/10 via-primary-light/30 to-transparent blur-3xl opacity-70" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        <PublicNavbar currentTab={currentTab} onTabChange={onTabChange} />

        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>

        {/* Footer Institucional en Azul Marino Profundo */}
        <footer className="border-t border-slate-800 bg-[#07273B] text-slate-300 mt-16">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-700/60 text-xs">
              
              {/* Columna 1: Marca */}
              <div className="space-y-3 md:col-span-2">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                    MB
                  </div>
                  <div>
                    <span className="block font-bold text-white text-sm tracking-wide">
                      Medical & Biosecurity
                    </span>
                    <span className="block text-[10px] text-primary uppercase font-bold tracking-wider">
                      Salud · Confianza · Siempre Contigo
                    </span>
                  </div>
                </div>
                <p className="text-slate-400 max-w-sm leading-relaxed text-[11px]">
                  Confección especializada de indumentaria médica bajo la submarca <strong>Indumedics</strong> y distribución autorizada de dispositivos y consumibles clínicos en Quito, Ecuador.
                </p>
              </div>

              {/* Columna 2: Navegación Rápida */}
              <div className="space-y-2">
                <span className="text-white font-bold tracking-wider uppercase text-[11px] block">
                  Líneas de Atención
                </span>
                <ul className="space-y-1.5 text-slate-400">
                  <li>
                    <button onClick={() => onTabChange('clothing')} className="hover:text-primary transition-colors cursor-pointer">
                      Uniformes & Scrubs Indumedics
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onTabChange('clothing')} className="hover:text-primary transition-colors cursor-pointer">
                      Servicio de Bordado Computarizado
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onTabChange('supplies')} className="hover:text-primary transition-colors cursor-pointer">
                      Equipamiento & Insumos Hospitalarios
                    </button>
                  </li>
                </ul>
              </div>

              {/* Columna 3: Contacto Directo */}
              <div className="space-y-2">
                <span className="text-white font-bold tracking-wider uppercase text-[11px] block">
                  Contacto Matriz
                </span>
                <div className="space-y-1.5 text-slate-400 text-[11px]">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>{COMPANY_INFO.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>{COMPANY_INFO.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>{COMPANY_INFO.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Barra Inferior */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
              <div>
                &copy; {new Date().getFullYear()} Medical & Biosecurity. Calidad en cada detalle.
              </div>

              <div className="flex items-center gap-4">
                {isAdminAuthenticated ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onTabChange('admin')}
                      className={`hover:text-primary transition-colors cursor-pointer font-bold ${
                        currentTab === 'admin' ? 'text-primary' : ''
                      }`}
                    >
                      Panel Administrativo
                    </button>
                    <button
                      onClick={onLogout}
                      className="inline-flex items-center gap-1 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <LogOut className="h-3 w-3" /> Salir
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={onOpenLoginModal}
                    className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                  >
                    <Lock className="h-3 w-3 text-primary" /> Acceso Administrativo
                  </button>
                )}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}