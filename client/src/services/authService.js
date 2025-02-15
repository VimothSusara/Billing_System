import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SERVER_HOST;

export const login = async (username, password) => {
  return await axios.post(
    `${API_BASE_URL}/api/auth/login`,
    { username, password },
    { withCredentials: true }
  );
};

export const logout = async () => {
  return await axios.post(
    `${API_BASE_URL}/api/auth/logout`,
    {},
    { withCredentials: true }
  );
};

export const checkAuth = async () => {
  return await axios.get(`${API_BASE_URL}/api/auth/check`, {
    withCredentials: true,
  });
};

export const refreshToken = async () => {
  return await axios.get(`${API_BASE_URL}/api/auth/refresh`, {
    withCredentials: true,
  });
};
