// src/App.tsx
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PublicLayout from './layouts/PublicLayout';
import HomeView from './features/marketing/components/HomeView';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  return (
    <QueryClientProvider client={queryClient}>
      <PublicLayout currentTab={activeTab} onTabChange={setActiveTab}>
        {/* Renderizado Condicional de Módulos */}
        {activeTab === 'home' && <HomeView />}

        {activeTab === 'clothing' && (
          <div className="rounded-lg border border-dashed border-slate-300 p-12 text-center bg-white">
            <h3 className="text-lg font-medium text-slate-900 font-sans">Línea de Ropa Médica Premium</h3>
            <p className="text-sm text-slate-500 mt-1">Próximamente: Catálogo con filtros avanzados de color, talla y tipo de textil quirúrgico.</p>
          </div>
        )}

        {activeTab === 'supplies' && (
          <div className="rounded-lg border border-dashed border-slate-300 p-12 text-center bg-white">
            <h3 className="text-lg font-medium text-slate-900 font-sans">Catálogo de Insumos y Dispositivos Médicos</h3>
            <p className="text-sm text-slate-500 mt-1">Próximamente: Conexión con el backend para listar mascarillas, guantes y stock en tiempo real.</p>
          </div>
        )}
      </PublicLayout>
    </QueryClientProvider>
  );
}