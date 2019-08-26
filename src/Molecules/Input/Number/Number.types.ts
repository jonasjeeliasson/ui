import { InjectedIntlProps, InjectedIntl } from 'react-intl';

export type Props = {
  className?: string;
  /** Label should always be presented - A11y */
  label: string;
  /** But you can hide it visually */
  hideLabel?: boolean;
  error?: string;
  success?: boolean;
  /** TODO: is this needed? */
  disabled?: boolean;
  fullWidth?: boolean;
  fieldId: string;
  size?: 's';
  step?: string | number;
  min?: string | number;
  max?: string | number;
  value?: string | number;
  defaultValue?: string | number;
  name?: string;
  /**
   * You need to specify width
   * (better in pixels), because
   * that will affect wrapping
   * of the error/info text
   * underneath
   */
  width?: string | number;

  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  onStepUp?: Function;
  onStepDown?: Function;
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
