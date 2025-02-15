import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SERVER_HOST;

//get item categories
export const getCategories = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/categories/`,
    { withCredentials: true }
  );
  return response.data;
};
