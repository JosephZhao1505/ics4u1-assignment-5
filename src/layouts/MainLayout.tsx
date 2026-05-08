import { Header } from '@/components/site/Header';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
