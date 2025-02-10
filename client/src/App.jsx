import { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import useAuthStore from "@/store/authStore";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import Login from "@/pages/Auth/Login";
import Navbar from "@/components/navigation/Navbar";
import MainLayout from "@/layouts/MainLayout";
import LoadingScreen from "@/components/LoadingScreen";

//import route
import RouteList from "@/routes/RouteList";

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    try {
      checkAuth();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const lastRoute = localStorage.getItem("lastRoute");
  const isValidRoute = RouteList.some((route) => route.path === lastRoute);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Router>
        <Navbar />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to={isValidRoute ? lastRoute : "/dashboard"} />
                ) : (
                  <Login />
                )
              }
            />
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                {RouteList.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Route>
            </Route>
            <Route
              path="/*"
              element={loading ? null : <Navigate to="/login" />}
            />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
