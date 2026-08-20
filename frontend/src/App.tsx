import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PublicLayout from './layouts/PublicLayout';
import HomeView from './features/marketing/components/HomeView';
import ClothingView from './features/clothing/components/ClothingView';
import SuppliesView from './features/catalog/components/SuppliesView';
import AdminCatalogView from './features/catalog/components/AdminCatalogView';
import AdminLoginModal from './features/auth/components/AdminLoginModal';
import { ADMIN_TOKEN_KEY } from './config/api.config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1 },
  },
});

export default function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(
    () => Boolean(localStorage.getItem(ADMIN_TOKEN_KEY))
  );
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsLoginModalOpen(false);
    setActiveTab('admin');
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setIsAdminAuthenticated(false);
    if (activeTab === 'admin') {
      setActiveTab('home');
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <PublicLayout
        currentTab={activeTab}
        onTabChange={setActiveTab}
        isAdminAuthenticated={isAdminAuthenticated}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      >
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'clothing' && <ClothingView />}
        {activeTab === 'supplies' && <SuppliesView />}
        {activeTab === 'admin' && isAdminAuthenticated && <AdminCatalogView />}
      </PublicLayout>

      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </QueryClientProvider>
  );
}