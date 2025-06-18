import type { Socket } from "socket.io-client";

export type FormFieldProps = {
  title: string;
  type: string;
  placeholder?: string;
  value?: string;
  accept?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export interface User {
  _id: string;
  name: string;
  email: string;
  gender: string;
  profilePicture?: string;
}

export interface useUserStoreInterface {
  user: User | null;
  loading: boolean;
  // checkingAuth: boolean

  signup: (name: string, email: string, password: string, gender: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface useConversationStoreInterface {
  loading: boolean;
  messages: Message[];
  selectedConversation: User | null;
  sideBarUsers: User[];

  getSideBarUsers: () => void;
  setSelectedConversation: (user: User | null) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: string) => void;
  getMessages: (receiverId: string) => void;
  sendMessage: (receiverId: string, message: string) => Promise<void> //TODO or make message interface instead of voids
}

// socket interface
export interface SocketContextType {
    socket: Socket | null;
    onlineUsers: string[];
};