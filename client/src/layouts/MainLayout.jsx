import { Outlet } from "react-router-dom";

import Sidebar from "../components/navigation/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 m-2">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
