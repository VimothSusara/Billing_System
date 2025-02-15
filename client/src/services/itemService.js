import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SERVER_HOST;

//get next available item code
export const getNextItemCode = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/items/next`, {
    withCredentials: true,
  });
  return { success: true, nextItemCode: response.data.nextItemCode };
};

//get item type
export const getItemTypes = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/items/types`, {
    withCredentials: true,
  });
  return response.data;
};

//get item measure
export const getItemMeasures = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/items/measures`, {
    withCredentials: true,
  });
  return response.data;
};

//get item warranties
export const getItemWarranties = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/items/warranties`, {
    withCredentials: true,
  });
  return response.data;
};

//get all items
export const getAllItems = async (currentPage, limit) => {
  // console.log("Currently Passing: ", currentPage)
  // console.log("Currently Passing: ", limit)
  const response = await axios.get(
    `${API_BASE_URL}/api/items?page=${currentPage}&limit=${limit}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

//get item by id
export const getItemById = async (itemId) => {
  const response = await axios.get(`${API_BASE_URL}/api/items/${itemId}`, {
    withCredentials: true,
  });
  return response.data;
};

//create a new item
export const createItem = async (item) => {
  const response = await axios.post(`${API_BASE_URL}/api/items/`, item, {
    withCredentials: true,
  });
  return response.data;
};

//update an item
