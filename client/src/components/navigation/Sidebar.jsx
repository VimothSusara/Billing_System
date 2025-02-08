import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-72 bg-gray-800 text-white p-4">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          "block py-2 px-4 hover:bg-gray-700" + (isActive ? " bg-gray-600" : "")
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/module"
        className={({ isActive }) =>
          "block py-2 px-4 hover:bg-gray-700" + (isActive ? " bg-gray-600" : "")
        }
      >
        Module
      </NavLink>
      <NavLink to="/products" className="block py-2 px-4 hover:bg-gray-700">
        Products
      </NavLink>
      <NavLink to="/orders" className="block py-2 px-4 hover:bg-gray-700">
        Orders
      </NavLink>
      <NavLink to="/invoices" className="block py-2 px-4 hover:bg-gray-700">
        Invoices
      </NavLink>
      <NavLink to="/settings" className="block py-2 px-4 hover:bg-gray-700">
        Settings
      </NavLink>
    </div>
  );
};

export default Sidebar;
