import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SERVER_HOST;

export const searchSuppliers = async (keyword) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/suppliers/search?q=${keyword}`,
    { withCredentials: true }
  );
  return response.data;
};
