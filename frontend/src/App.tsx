// src/App.tsx
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PublicLayout from './layouts/PublicLayout';
import HomeView from './features/marketing/components/HomeView';
import ClothingView from './features/clothing/components/ClothingView';
import SuppliesView from './features/catalog/components/SuppliesView';
import AdminProductForm from './features/catalog/components/AdminProductForm';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1 },
  },
});

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(false);

  // Protocolo de escucha perimetral: Detectar Backdoor en la URL (?vault=true)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('vault') === 'true') {
      setIsAdminUnlocked(true);
      setActiveTab('admin'); // Auto-redirigir al panel de control
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PublicLayout currentTab={activeTab} onTabChange={setActiveTab}>
        {/* Renderizado Condicional Seguro */}
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'clothing' && <ClothingView />}
        {activeTab === 'supplies' && <SuppliesView />}
        
        {/* El panel administrativo solo se monta si se superó la validación perimetral */}
        {activeTab === 'admin' && isAdminUnlocked && <AdminProductForm />}
      </PublicLayout>
    </QueryClientProvider>
  );
}