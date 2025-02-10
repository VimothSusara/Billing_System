import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Sidebar from "@/components/navigation/Sidebar";
import useLastRoute from "@/hooks/useLastRoute";
import useAuthStore from "@/store/authStore";

const MainLayout = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  useLastRoute(location.pathname, isAuthenticated);

  return (
    <div className="flex h-screen w-screen">
      <aside className="w-72 h-full fixed left-0 top-16 z-20 overflow-y-auto hide-scrollbar shadow-lg shadow-gray-400">
        <Sidebar />
      </aside>
      <main className="flex-1 ml-72 pt-16 h-screen flex">
        <div className="p-4 m-3 shadow-lg rounded-lg overflow-y-auto container bg-gray-100 hide-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
