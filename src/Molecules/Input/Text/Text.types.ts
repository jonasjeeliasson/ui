export type Props = {
  className?: string;
  /** Label should always be presented - A11y */
  label: string;
  /** But you can hide it visually */
  hideLabel?: boolean;

  name?: string;
  error?: string;
  success?: boolean;
  /** TODO: is this needed? */
  extraInfo?: string;
  rightAddon?: React.ReactNode;
  leftAddon?: React.ReactNode;
  disabled?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
  size?: 's';
  /**
   * You need to specify width
   * (better in pixels), because
   * that will affect wrapping
   * of the error/info text
   * underneath
   */
  width?: string | number;

  value?: string;
  defaultValue?: string;

  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
};
