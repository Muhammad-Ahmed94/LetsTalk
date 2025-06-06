/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosInst from "../lib/axios";
import toast from "react-hot-toast";
import { type useConversationStoreInterface } from "../types/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useConversationStore = create<useConversationStoreInterface>(
  (set, get) => ({
    loading: false,
    selectedConversation: null,
    messages: [],
    sideBarUsers: [],

    setSelectedConversation: (selectedConversation) => {
      // Select current conversation
      set({ selectedConversation });
      // Clear messages when switching conversation
      set({ messages: [] });

      if(selectedConversation) {
        get().getMessages(selectedConversation._id);
      }
    },

    setMessages: (messages) => set({ messages }),

    getSideBarUsers: async () => {
      set({ loading: true });

      try {
        const res = await axiosInst.get("/user");
        set({ sideBarUsers: res.data, loading: false });
      } catch (error: any) {
        console.error("Error fetching users from database", error.message);
        toast.error("Could not retrieve users from DB");
        set({ loading: false });
      }
    },

    // Get messages
    getMessages: async (receiverId: string) => {
      try {
        const res = await axiosInst.get(`/message/${receiverId}`);
        set({ messages: res.data });
      } catch (error:any) {
        console.error("Error fetching messages", error.messsage);
        toast.error("Failed to load message");
      }
    },


  })
);

export default useConversationStore;
