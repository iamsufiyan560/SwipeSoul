import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { getSocket } from "../socket/socket.client";
import { useAuthStore } from "./useAuthStore";

export const useMessageStore = create((set, get) => ({
  messages: [],
  loading: false,
  currentPage: 1,
  hasMore: true,

  sendMessage: async (receiverId, content) => {
    try {
      set((state) => ({
        messages: [
          ...state.messages,
          {
            _id: Date.now(),
            sender: useAuthStore.getState().authUser._id,
            content,
          },
        ],
      }));
      const res = await axiosInstance.post("/messages/send", {
        receiverId,
        content,
      });
      console.log("message sent", res.data);
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  },

  getMessages: async (userId, page = 1) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get(`/messages/conversation/${userId}`, {
        params: { page, limit: 50 },
      });
      set((state) => ({
        messages:
          page === 1
            ? res.data.messages
            : [...res.data.messages, ...state.messages],
        currentPage: res.data.currentPage,
        hasMore: res.data.hasMore,
      }));
    } catch (error) {
      console.log(error);
      set({ messages: [] });
    } finally {
      set({ loading: false });
    }
  },

  loadMoreMessages: async (userId) => {
    const { currentPage, hasMore, loading } = get();
    if (!hasMore || loading) return;
    await get().getMessages(userId, currentPage + 1);
  },

  subscribeToMessages: () => {
    const socket = getSocket();
    socket.on("newMessage", ({ message }) => {
      set((state) => ({ messages: [...state.messages, message] }));
    });
  },

  unsubscribeFromMessages: () => {
    const socket = getSocket();
    socket.off("newMessage");
  },
}));
