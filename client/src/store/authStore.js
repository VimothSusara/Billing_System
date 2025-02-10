import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  toastMessage: null,

  login: async (username, password) => {
    set({ loading: true });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_HOST}/api/auth/login`,
        { username, password },
        { withCredentials: true }
      );

      set({
        user: res.data.user,
        isAuthenticated: true,
        loading: false,
        toastMessage: "Login successful!",
      });

      localStorage.setItem("lastRoute", "/dashboard");

      return { success: true };
    } catch (err) {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        toastMessage: err.response?.data?.error || "Login failed!",
      });
      return {
        success: false,
        message: err.response?.data?.error || err.error,
      };
    }
  },

  logout: async () => {
    await axios.post(
      `${import.meta.env.VITE_SERVER_HOST}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    localStorage.removeItem("lastRoute");
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_HOST}/api/auth/check`,
        { withCredentials: true }
      );
      set({ user: res.data.user, isAuthenticated: true, loading: false });
      // const lastRoute = localStorage.getItem("lastRoute");
      // if (lastRoute) {
      //   console.log("User redirected to: ", lastRoute);
      // }
    } catch {
      set({ user: null, isAuthenticated: false, loading: false });
      // await refreshAuth();
    }
  },

  refreshAuth: async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_HOST}/api/auth/refresh`,
        { withCredentials: true }
      );
      const { user } = res.data;
      set({ user, isAuthenticated: true, loading: false });
    } catch {
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },

  clearToast: () => set({ toastMessage: null }),
}));

export default useAuthStore;
