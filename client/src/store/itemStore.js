import { create } from "zustand";
import { handleError } from "@/utils/errorHandler";
import {
  getAllItems,
  getItemTypes,
  getItemMeasures,
  getItemWarranties,
} from "@/services/itemService";
import { getCategories } from "@/services/categoryService";

const useItemStore = create((set) => ({
  items: [],
  selectedItem: null,
  totalPages: 0,
  limit: 15,
  currentPage: 1,
  totalCount: 0,
  loading: false,
  toastMessage: null,
  setItems: (items) => set({ ...items, items }),
  setSelectedItem: (item) => set({ selectedItem: item }),
  setPage: (page) => set({ currentPage: page }),
  setTotalPages: (totalPages) => set({ totalPages: totalPages }),
  setTotalCount: (totalCount) => set({ totalCount: totalCount }),
  fetchItems: async (currentPage, limit) => {
    try {
      set({ loading: true });
      const response = await getAllItems(currentPage, limit);
      set({
        items: response.items,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
        totalCount: response.totalCount,
        loading: false,
      });
    } catch (error) {
      const err = handleError(error, set);
      set({ toastMessage: err });
    }
  },
  itemTypeOptions: [],
  fetchItemTypes: async () => {
    try {
      const response = await getItemTypes();
      // console.log("Fetching Type data: ", response);
      set({ itemTypeOptions: response });
    } catch (error) {
      const err = handleError(error, set);
      set({ toastMessage: err });
    }
  },
  itemCategoryOptions: [],
  fetchItemCategories: async () => {
    try {
      const response = await getCategories();
      // console.log("Fetching Category data: ", response);
      set({ itemCategoryOptions: response });
    } catch (error) {
      const err = handleError(error, set);
      set({ toastMessage: err });
    }
  },
  itemMeasureOptions: [],
  fetchItemMeasures: async () => {
    try {
      const response = await getItemMeasures();
      // console.log("Fetching Measure data: ", response);
      set({ itemMeasureOptions: response });
    } catch (error) {
      const err = handleError(error, set);
      set({ toastMessage: err });
    }
  },
  itemWarrantyOptions: [],
  fetchItemWarranties: async () => {
    try {
      const response = await getItemWarranties();
      // console.log("Fetching Warranty data: ", response);
      set({ itemWarrantyOptions: response });
    } catch (error) {
      const err = handleError(error, set);
      set({ toastMessage: err });
    }
  },
}));

export default useItemStore;
