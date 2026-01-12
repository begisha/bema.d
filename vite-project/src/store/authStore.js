import { create } from "zustand";
import { api } from "../api/axios";

export const useAuthStore = create((set) => ({
  user: null,
  isAuth: !!localStorage.getItem('accessToken'),
  isLoading: false,

  login: async (data) => {
    set({ isLoading: true });
    try {
      const res = await api.post('/auth/login', data);
      
      const { token, user } = res.data; 
      
      localStorage.setItem('accessToken', token.accessToken);
      localStorage.setItem('refreshToken', token.refreshToken);
      
      set({ user, isAuth: true });
    } catch (err) {
      console.error("Ошибка при входе:", err);
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (data) => {
    set({ isLoading: true });
    try {
      const res = await api.post('/auth/register', data);
      
      if (res.data.token) {
        localStorage.setItem('accessToken', res.data.token.accessToken);
        localStorage.setItem('refreshToken', res.data.token.refreshToken);
        set({ user: res.data.user, isAuth: true });
      }
      return res.data;
    } catch (err) {
      console.error("Ошибка при регистрации:", err);
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ user: null, isAuth: false });
  }
}));