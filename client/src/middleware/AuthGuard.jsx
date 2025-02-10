import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import LoadingScreen from "@/components/LoadingScreen";

export default function AuthGuard({ children }) {
  const { loading } = useAuthStore();

  if (loading) {
    return <LoadingScreen />;
  }

  return children;
}
