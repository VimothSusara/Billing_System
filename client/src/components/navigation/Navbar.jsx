import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";

import useAuthStore from "../../store/authStore";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className="w-full p-4 flex justify-between items-center shadow-md shadow-gray-300">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold">Billing System</h1>
        </div>

        {isAuthenticated ? (
          <div className="flex flex-row justify-around gap-0.5">
            <button className="" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        ) : (
          <></>
        )}
      </nav>
    </>
  );
};

export default Navbar;
