// src/App.tsx
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PublicLayout from './layouts/PublicLayout';

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
        {/* Renderizado Condicional Interactivo basado en el Estado */}
        {activeTab === 'home' && (
          <div className="space-y-4 text-center py-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-medical-dark sm:text-4xl">
              Confianza y Protección para el Sector Salud
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-slate-500">
              Bienvenidos a Medical and Biosecurity. Suministramos equipos de protección y la línea de uniformes médicos premium con los más altos estándares de calidad y esterilidad del mercado.
            </p>
          </div>
        )}

        {activeTab === 'clothing' && (
          <div className="rounded-lg border border-dashed border-slate-300 p-12 text-center bg-white">
            <h3 className="text-lg font-medium text-slate-900">Módulo de Ropa Médica Premium</h3>
            <p className="text-sm text-slate-500 mt-1">Próximamente: Catálogo con filtros avanzados de color, talla y tipo de textil quirúrgico.</p>
          </div>
        )}

        {activeTab === 'supplies' && (
          <div className="rounded-lg border border-dashed border-slate-300 p-12 text-center bg-white">
            <h3 className="text-lg font-medium text-slate-900">Catálogo de Insumos y Dispositivos Médicos</h3>
            <p className="text-sm text-slate-500 mt-1">Próximamente: Conexión con el backend para listar mascarillas, guantes y stock en tiempo real.</p>
          </div>
        )}
      </PublicLayout>
    </QueryClientProvider>
  );
}