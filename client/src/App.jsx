import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import useAuthStore from "./store/authStore";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Login from "./pages/Login";
import Navbar from "./components/navigation/Navbar";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Module from "./pages/Module";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const { checkAuth, isAuthenticated, loading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/module" element={<Module />} />
            </Route>
          </Route>
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
