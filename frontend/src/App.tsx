import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PublicLayout from './layouts/PublicLayout';
import HomeView from './features/marketing/components/HomeView';
import ClothingView from './features/clothing/components/ClothingView';
import SuppliesView from './features/catalog/components/SuppliesView';
import AdminCatalogView from './features/catalog/components/AdminCatalogView';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1 },
  },
});

const isVaultParamPresent = (): boolean => {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('vault') === 'true';
};

export default function App() {
  const [isAdminUnlocked] = useState<boolean>(() => isVaultParamPresent());
  const [activeTab, setActiveTab] = useState<string>(() =>
    isVaultParamPresent() ? 'admin' : 'home'
  );

  return (
    <QueryClientProvider client={queryClient}>
      <PublicLayout currentTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'clothing' && <ClothingView />}
        {activeTab === 'supplies' && <SuppliesView />}
        {activeTab === 'admin' && isAdminUnlocked && <AdminCatalogView />}
      </PublicLayout>
    </QueryClientProvider>
  );
}