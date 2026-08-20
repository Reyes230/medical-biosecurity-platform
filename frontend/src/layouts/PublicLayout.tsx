import type { ReactNode } from 'react';
import PublicNavbar from '../components/shared/PublicNavbar';
import { Lock, LogOut } from 'lucide-react';

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
    <div className="flex min-h-screen flex-col bg-surface">
      <PublicNavbar currentTab={currentTab} onTabChange={onTabChange} />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 sm:px-6 lg:px-8">
          <div>
            &copy; {new Date().getFullYear()} Medical and Biosecurity Platform. Todos los derechos reservados.
          </div>

          <div className="flex items-center gap-4">
            {isAdminAuthenticated ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onTabChange('admin')}
                  className={`hover:text-primary transition-colors cursor-pointer font-medium ${
                    currentTab === 'admin' ? 'text-primary font-bold' : ''
                  }`}
                >
                  Panel de Control
                </button>
                <button
                  onClick={onLogout}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                  title="Cerrar sesión administrativa"
                >
                  <LogOut className="h-3.5 w-3.5" /> Salir
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLoginModal}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <Lock className="h-3 w-3" /> Administración
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}