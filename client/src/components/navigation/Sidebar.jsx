import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white p-4">
      <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-700">
        Dashboard
      </Link>
      <Link to="/module" className="block py-2 px-4 hover:bg-gray-700">
        Module
      </Link>
      <Link to="/products" className="block py-2 px-4 hover:bg-gray-700">
        Products
      </Link>
      <Link to="/orders" className="block py-2 px-4 hover:bg-gray-700">
        Orders
      </Link>
      <Link to="/invoices" className="block py-2 px-4 hover:bg-gray-700">
        Invoices
      </Link>
      <Link to="/settings" className="block py-2 px-4 hover:bg-gray-700">
        Settings
      </Link>
    </div>
  );
};

export default Sidebar;
