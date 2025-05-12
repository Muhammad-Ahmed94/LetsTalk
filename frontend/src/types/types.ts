export type FormFieldProps = {
  title: string;
  type: string;
  placeholder?: string;
  value?: string;
  accept?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
