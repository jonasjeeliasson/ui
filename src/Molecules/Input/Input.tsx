import React from 'react';
import styled, { ThemedStyledProps, css } from 'styled-components';
import { Props, InputProps } from './Index.types';
import { Label, Typography } from '../..';
import NormalizedElements from '../../common/NormalizedElements';
import { Theme } from '../../theme/theme.types';

const ErrorTypography = styled(Typography)`
  display: block;
`;

const getBorderStyles = (props: ThemedStyledProps<InputProps, Theme>) => {
  const { disabled, success, error, theme } = props;
  let borderColor = theme.color.inputBorder as string;

  if (disabled) {
    borderColor = 'transparent';
  }

  if (success) {
    borderColor = theme.color.positive;
  }

  if (error) {
    borderColor = theme.color.negative;
  }

  // prettier-ignore
  return `
    border: 1px solid ${borderColor};

    ${
      !disabled && !success && !error ? `
        &:hover {
          border-color: ${theme.color.inputBorderHover};
        }
      ` : ''
    }

   ${
     !disabled ? `
      &:active,
      &:focus {
        border-color: ${theme.color.cta};
      }
    ` : ''
   }
  `;
};

const getDisabledColors = (disabled: InputProps['disabled']) =>
  disabled
    ? css`
        background: ${p => p.theme.color.disabledBackground};
        color: ${p => p.theme.color.disabledText};

        &::placeholder {
          color: ${p => p.theme.color.disabledText};
        }
      `
    : '';

const StyledInput = styled(NormalizedElements.Input)`
  min-width: 25ch;
  color: ${p => p.theme.color.text};
  padding: 0 ${p => p.theme.spacing.unit(2)}px;
  height: ${p => p.theme.spacing.unit(p.size === 's' ? 8 : 10)}px;
  box-sizing: border-box;
  outline: none;
  &::placeholder {
    color: ${p => p.theme.color.label};
    opacity: 1;
  }
  ${p => getBorderStyles(p)}
  ${p => getDisabledColors(p.disabled)}
`;

const Text: React.FC<Props> = ({
  className,
  size = 'm',
  label,
  placeholder,
  disabled,
  success,
  error,
  errorMessage,
  defaultValue,
}) => (
  <Typography type="secondary">
    <Label text={label} className={className}>
      <StyledInput
        type="text"
        size={size}
        placeholder={placeholder}
        disabled={disabled}
        success={success}
        error={error}
        defaultValue={defaultValue}
      />
      {error && errorMessage ? (
        <ErrorTypography type="tertiary" color={t => t.color.negative}>
          {errorMessage}
        </ErrorTypography>
      ) : (
        ''
      )}
    </Label>
  </Typography>
);
Text.displayName = 'Input.Text';

export const Input = { Text };
