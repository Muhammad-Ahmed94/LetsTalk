import { create } from "zustand";
import axiosInst from "../lib/axios";
import toast from "react-hot-toast";
import { type useConversationStoreInterface } from "../types/types";

const useConversationStore = create<useConversationStoreInterface>((set, get) => ({
  loading: false,
  selectedConversation: null,
  messages: [],
  sideBarUsers: [],

  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

  setMessages: (messages) => set({ messages }),

  getSideBarUsers: async () => {
    set({ loading: true });

    try {
      const res = await axiosInst.get("/user");
      set({ sideBarUsers: res.data, loading: false });
    } catch (error:any) {
      console.error("Error fetching users from database", error.message);
      toast.error("Could not retrieve users from DB");
      set({ loading: false })
    }
  },
}));

export default useConversationStore;
