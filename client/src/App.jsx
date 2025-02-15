import { Suspense, useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import useAuthStore from "@/store/authStore";
// import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import Login from "@/pages/Auth/Login";
import Navbar from "@/components/navigation/Navbar";
import MainLayout from "@/layouts/MainLayout";
import LoadingScreen from "@/components/LoadingScreen";

// Import route
import RouteList from "@/routes/RouteList";

function App() {
  const { isAuthenticated, checkAuth, loading } = useAuthStore();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth();
      } catch (e) {
        console.log(e);
      }
    };

    verifyAuth();
  }, [checkAuth]);

  const lastRoute = localStorage.getItem("lastRoute");
  const isValidRoute = RouteList.some((route) => route.path === lastRoute);

  const loginElement = useMemo(() => {
    return isAuthenticated ? (
      <Navigate to={isValidRoute ? lastRoute : "/dashboard"} />
    ) : (
      <Login />
    );
  }, [isAuthenticated, isValidRoute, lastRoute]);

  const protectedElement = useMemo(() => {
    return isAuthenticated ? <MainLayout /> : <Navigate to="/login" />;
  }, [isAuthenticated]);

  const routes = useMemo(() => {
    if (loading) {
      return <LoadingScreen />;
    }

    return (
      <Routes>
        <Route path="/login" element={loginElement} />
        <Route element={protectedElement}>
          {RouteList.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }, [loading, loginElement, protectedElement]);

  return (
    <>
      <Router>
        <Navbar />
        <Suspense fallback={<LoadingScreen />}>{routes}</Suspense>
      </Router>
    </>
  );
}

export default App;
