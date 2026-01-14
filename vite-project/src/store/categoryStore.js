import { create } from "zustand";
import { api } from "../api/axios";

export const useCategoryStore = create((set, get) => ({
  categories: [],

  getCategories: async () => {
    try {
      const res = await api.get('/categories');
      const data = Array.isArray(res.data) ? res.data : (res.data.categories || []);
      set({ categories: data });
    } catch (err) {
    }
  },

  createCategory: async (title) => {
    try {
      await api.post('/categories/create', { title });
      await get().getCategories(); 
    } catch (err) {
    }
  },

  deleteCategory: async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      await get().getCategories(); 
      return true;
    } catch (err) {
      return false;
    }
  }
}));