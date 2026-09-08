import { useState } from 'react';
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
  const { totalItems, toggleCart } = useCart();

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
    <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-2xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo Oficial de la Marca */}
          <button
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3 cursor-pointer text-left group"
          >
            <img
              src="/images/branding/logo-horizontal.webp"
              alt="Medical & Biosecurity"
              className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-102"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </button>

          {/* Menú Desktop */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-medical-dark shadow-2xs border border-slate-200/60'
                      : 'text-slate-500 hover:text-medical-dark hover:bg-white/50'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Botón Bolsa / Cotización & Menú Móvil */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleCart}
              className="relative inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-2xs hover:bg-primary-dark transition-colors cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Mi Pedido</span>
              {totalItems > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-medical-dark text-white text-[10px] font-extrabold">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Toggle Menú Móvil */}
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

      {/* Menú Móvil Desplegable */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-white p-4 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-primary-light text-medical-dark border border-primary/20'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className="h-4 w-4 text-primary" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}