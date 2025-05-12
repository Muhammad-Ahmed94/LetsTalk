import axios from "axios";
import axiosInst from "../lib/axios";
import { create } from "zustand";

interface useUserStoreInterface {
  user: any;
  loading: boolean;
  // checkingAuth: boolean

  signup: (name: string, email: string, password: string) => void;
  // login: (email: string, password: string) => void;
  // logout: () => void;
}
const useUserStore = create<useUserStoreInterface>((set, get) => ({
  user: null,
  loading: false,
  // checkingAuth: false,

  signup: async (name, email, password) => {
    set({ loading: true });

    try {
      const res = await axiosInst.post("/auth/signup", {
        name,
        email,
        password,
      });
      set({ user: res.data.user, loading: false });
      console.log(res.data);
    } catch (error: any) {
      set({ loading: false });
      console.error("Error occured while signing up", error.message);
    }
  },
}));

export default useUserStore;
