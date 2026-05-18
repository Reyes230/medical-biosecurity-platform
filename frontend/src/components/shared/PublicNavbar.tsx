// src/components/shared/PublicNavbar.tsx
import { Shield, Shirt, Stethoscope, Users } from 'lucide-react';

interface PublicNavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function PublicNavbar({ currentTab, onTabChange }: PublicNavbarProps) {
  const navItems = [
    { id: 'home', label: 'Quiénes Somos', icon: Users },
    { id: 'clothing', label: 'Ropa Médica', icon: Shirt },
    { id: 'supplies', label: 'Insumos y Equipos', icon: Stethoscope },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          {/* Logo / Identidad */}
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-sans text-xl font-bold tracking-tight text-medical-dark">
              Medical & Biosecurity
            </span>
          </div>

          {/* Menú de Navegación */}
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`inline-flex items-center space-x-2 border-b-2 px-1 pt-1 text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'border-primary text-primary'
                      : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}