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
      return { success: true };
    } catch (err) {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        toastMessage: err.response?.data?.error || "Login failed!", // ✅ Improved error handling
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
    } catch {
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },

  clearToast: () => set({ toastMessage: null }),
}));

export default useAuthStore;
