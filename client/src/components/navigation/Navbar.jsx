import useAuthStore from "@/store/authStore";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className="w-full fixed top-0 left-0 h-16 p-4 flex justify-between z-20 shadow-md shadow-medium-gray bg-deep-indigo items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold text-white">Billing System</h1>
        </div>

        {isAuthenticated ? (
          <div className="flex flex-row justify-around gap-0.5">
            <button className="text-white" onClick={handleLogout}>
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
