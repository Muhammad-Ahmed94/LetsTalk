import toast from "react-hot-toast";
import { create } from "zustand";

import axiosInst from "../lib/axios";
import { type useConversationStoreInterface } from "../types/types";

const useConversationStore = create<useConversationStoreInterface>((set, get) => ({
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

    // Method to add single message for RT updates
    addMessage: (message:any) => {
      set((state) => ({
        messages: [...state.messages, message]
      }))
    },
    
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
    getMessages: async (receiverId) => {
      try {
        const res = await axiosInst.get(`/message/${receiverId}`);
        set({ messages: res.data });
      } catch (error:any) {
        console.error("Error fetching messages", error.messsage);
        toast.error("Failed to load message");
      }
    },

    sendMessage: async (receiverId, message) => {
      try {
        const res = await axiosInst.post(`/message/send/${receiverId}`, {message});

        // Add new message to current messages
        set(state => ({
          messages: [...state.messages, res.data]
        }));
        return res.data;
      } catch (error:any) {
        console.error("Error sending message", error.message);
        toast.error("Failed to send a message");
        throw error;
      }
    }
  })
);

export default useConversationStore;
