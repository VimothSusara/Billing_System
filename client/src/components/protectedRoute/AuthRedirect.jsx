import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

export default function AuthRedirect({ children }) {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard"); // ✅ Redirect logged-in users to the dashboard
    }
  }, [isAuthenticated, navigate]);

  return children;
}
