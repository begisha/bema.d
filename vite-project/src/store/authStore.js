import { create } from "zustand";
import { api } from "../api/axios";

export const useAuthStore = create((set) => ({
  user: null,
  isAuth: !!localStorage.getItem('accessToken'),
  isLoading: false,
  profile: null,

  getProfile: async () => {
    try {
      const res = await api.get('/auth/profile');
      set({ profile: res.data });
      return res.data;
    } catch (err) {
      return null;
    }
  },

  login: async (data) => {
    set({ isLoading: true });
    try {
      const res = await api.post('/auth/login', data);
      
      const accessToken = res.data.token?.accessToken || res.data.accessToken;
      const refreshToken = res.data.token?.refreshToken || res.data.refreshToken;
      const userData = res.data.user || res.data;

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        set({ user: userData, isAuth: true });
      }
    } catch (err) {
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.clear();
    set({ user: null, profile: null, isAuth: false });
  }
}));