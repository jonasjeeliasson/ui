export type InputProps = {
  placeholder?: string;
  size?: 's' | 'm';
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  errorMessage?: string;
  defaultValue?: string;
};

export type Props = {
  className?: string;
  label: string;
} & InputProps;
