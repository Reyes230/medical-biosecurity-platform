import { useState, useEffect } from 'react';
import {
  Shirt,
  Stethoscope,
  Users,
  Menu,
  X,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '../../features/cart/hooks/useCart';

interface PublicNavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function PublicNavbar({ currentTab, onTabChange }: PublicNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Quiénes Somos', icon: Users },
    { id: 'clothing', label: 'Ropa Médica (Indumedics)', icon: Shirt },
    { id: 'supplies', label: 'Insumos Clínicos', icon: Stethoscope },
  ];

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B3D5C]/95 backdrop-blur-md border-b border-primary/30 shadow-lg py-2.5'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs py-3.5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Oficial: Isotipo + Tipografía HTML Nítida */}
          <button
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3 cursor-pointer text-left group transition-transform hover:scale-101"
          >
            <img
              src="/images/branding/logo-icon.webp"
              alt="Medical & Biosecurity Isotipo"
              className="h-10 w-10 sm:h-11 sm:w-11 object-contain drop-shadow-sm group-hover:rotate-3 transition-transform"
            />
            <div className="flex flex-col">
              <span
                className={`font-sans font-extrabold text-base sm:text-lg tracking-tight leading-tight transition-colors duration-200 ${
                  isScrolled ? 'text-white' : 'text-medical-dark'
                }`}
              >
                Medical & Biosecurity
              </span>
              <span
                className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-colors duration-200 ${
                  isScrolled ? 'text-emerald-300' : 'text-primary'
                }`}
              >
                Salud · Confianza · Siempre Contigo
              </span>
            </div>
          </button>

          {/* Menú Desktop con Contraste Adaptable */}
          <div
            className={`hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl border transition-colors duration-200 ${
              isScrolled
                ? 'bg-slate-900/40 border-white/10'
                : 'bg-slate-100/80 border-slate-200/60'
            }`}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? isScrolled
                        ? 'bg-primary text-white shadow-md border border-primary/40'
                        : 'bg-white text-medical-dark shadow-2xs border border-slate-200/60'
                      : isScrolled
                      ? 'text-slate-300 hover:text-white hover:bg-white/10'
                      : 'text-slate-500 hover:text-medical-dark hover:bg-white/60'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      isActive
                        ? isScrolled
                          ? 'text-white'
                          : 'text-primary'
                        : isScrolled
                        ? 'text-slate-300'
                        : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Botón Carrito / Cotización & Botón Móvil */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleCart}
              className="relative inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary-dark active:scale-95 transition-all cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Mi Pedido</span>
              {totalItems > 0 && (
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-extrabold shadow-xs ${
                    isScrolled
                      ? 'bg-white text-medical-dark'
                      : 'bg-medical-dark text-white'
                  }`}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* Toggle Menú Móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-xl border transition-colors cursor-pointer ${
                isScrolled
                  ? 'border-slate-600 text-slate-200 hover:bg-white/10'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden border-t p-4 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200 ${
            isScrolled
              ? 'bg-[#0B3D5C] border-slate-700 text-white'
              : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                  isActive
                    ? isScrolled
                      ? 'bg-primary text-white border border-primary/40'
                      : 'bg-primary-light text-medical-dark border border-primary/20'
                    : isScrolled
                    ? 'text-slate-300 hover:bg-white/10'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-primary'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}