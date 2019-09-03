import { InjectedIntlProps, InjectedIntl } from 'react-intl';

export type Props = {
  /** Label should always be presented - A11y */
  label: string;
  /** But you can hide it visually */
  hideLabel?: boolean;
  autoFocus?: boolean;
  className?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  error?: string;
  extraInfo?: string;
  fieldId: string;
  fullWidth?: boolean;
  max?: string | number;
  min?: string | number;
  name?: string;
  noSteppers?: boolean;
  required?: boolean;
  size?: 's';
  step?: string | number;
  success?: boolean;
  value?: string | number;
  /**
   * You need to specify width
   * (better in pixels), because
   * that will affect wrapping
   * of the error/info text
   * underneath
   */
  width?: string | number;

  onStepUp?: (() => void) | ((value?: string) => void);
  onStepDown?: (() => void) | ((value?: string) => void);
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
};

export type NumberComponent = React.FunctionComponent<Props & InjectedIntlProps>;

export type adjustValueProps = {
  step: number;
  min?: number;
  max?: number;
  shouldIncrement: boolean;
  originalValue: number;
  intl: InjectedIntl;
};
