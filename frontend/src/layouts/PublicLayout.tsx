// src/layouts/PublicLayout.tsx
import type { ReactNode } from 'react';
import PublicNavbar from '../components/shared/PublicNavbar';

interface PublicLayoutProps {
  children: ReactNode;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function PublicLayout({ children, currentTab, onTabChange }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      {/* Barra de navegación superior inyectada */}
      <PublicNavbar currentTab={currentTab} onTabChange={onTabChange} />

      {/* Contenedor dinámico principal */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Pie de página estéril y profesional */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-slate-400 sm:px-6 lg:px-8">
          &copy; {new Date().getFullYear()} Medical and Biosecurity Platform. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}