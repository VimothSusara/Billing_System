import { create } from "zustand";

import { login, logout, checkAuth, refreshToken } from "@/services/authService";
import { handleError } from "@/utils/errorHandler";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  toastMessage: null,

  login: async (username, password) => {
    set({ loading: true });

    try {
      const res = await login(username, password);
      set({
        user: res.data.user,
        isAuthenticated: true,
        loading: false,
        toastMessage: "Login successful!",
      });
      localStorage.setItem("lastRoute", "/dashboard");
      return { success: true };
    } catch (err) {
      const errorMessage = handleError(err);
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        toastMessage: errorMessage,
      });
      return {
        success: false,
        message: errorMessage,
      };
    }
  },

  logout: async () => {
    try {
      await logout();
      localStorage.removeItem("lastRoute");
      set({ user: null, isAuthenticated: false });
    } catch (err) {
      const errorMessage = handleError(err);
      set({ toastMessage: errorMessage });
    }
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const res = await checkAuth();
      set({ user: res.data.user, isAuthenticated: true, loading: false });
      // const lastRoute = localStorage.getItem("lastRoute");
      // if (lastRoute) {
      //   console.log("User redirected to: ", lastRoute);
      // }
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
      // await refreshAuth();
    }
  },

  refreshAuth: async () => {
    try {
      const res = await refreshToken();
      set({ user: res.data.user, isAuthenticated: true, loading: false });
    } catch {
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },

  clearToast: () => set({ toastMessage: null }),
}));

export default useAuthStore;
