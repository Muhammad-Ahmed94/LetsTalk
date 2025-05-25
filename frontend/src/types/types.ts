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
  avatar?: string;
}
export interface useUserStoreInterface {
  user: User | null;
  loading: boolean;
  // checkingAuth: boolean

  signup: (name: string, email: string, password: string, gender: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export interface useConversationStoreInterface {
  loading: boolean;
  messages: any[];
  selectedConversation: User | null;
  sideBarUsers: User[];

  getSideBarUsers: () => void;
  setSelectedConversation: (user: User) => void;
  setMessages: (messages: any[]) => void;
}