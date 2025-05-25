import axios from "axios";
import axiosInst from "../lib/axios";
import { create } from "zustand";

import type { useUserStoreInterface } from "../types/types";

const useUserStore = create<useUserStoreInterface>((set, get) => ({
  user: null,
  loading: false,
  // checkingAuth: false,

  signup: async (name, email, password, gender) => {
    set({ loading: true });

    try {
      const res = await axiosInst.post("/auth/signup", {
        name,
        email,
        password,
        gender,
      });
      set({ user: res.data.user, loading: false });
      console.log(res.data);
    } catch (error: any) {
      set({ loading: false });
      console.error("Error occured while signing up", error.message);
    }
  },

  login: async (email, password) => {
    set({ loading: true });

    try {
      const res = await axiosInst.post("/auth/login", { email, password });
      set({ user: res.data.user, loading: false });
      console.log("user is:", res.data.user.name);
    } catch (error: any) {
      console.error("Error occured while logging in", error.message);
      throw new Error(error.response?.data?.message || "Login failed"); // <- important
    }
  },

  logout: async () => {
    set({ loading: true });

    try {
      await axiosInst.post("/auth/logout");
      set({ user: null, loading: false });
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  },
}));

export default useUserStore;
