export type FormFieldProps = {
  title: string;
  type: string;
  placeholder?: string;
  value?: string;
  accept?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export interface useUserStoreInterface {
  user: any;
  loading: boolean;
  // checkingAuth: boolean

  signup: (name: string, email: string, password: string, gender: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}
