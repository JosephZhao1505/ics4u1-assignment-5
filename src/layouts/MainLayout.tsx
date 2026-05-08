import { Outlet } from "react-router-dom";
import { Header } from "@/components/site/Header";

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
