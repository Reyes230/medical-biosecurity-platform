// src/App.tsx
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PublicLayout from './layouts/PublicLayout';
import HomeView from './features/marketing/components/HomeView';
import ClothingView from './features/clothing/components/ClothingView';
import SuppliesView from './features/catalog/components/SuppliesView';

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
        
        {activeTab === 'clothing' && <ClothingView />}

        {activeTab === 'supplies' && <SuppliesView />}
      </PublicLayout>
    </QueryClientProvider>
  );
}