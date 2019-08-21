import React from 'react';
import styled, { css } from 'styled-components';
import { Props } from './Number.types';
import { Flexbox } from '../../..';
import { FormField } from '../FormField';
import NormalizedElements from '../../../common/NormalizedElements';

const hasError = (error?: Props['error']) => error && error !== '';

const width = css<Pick<Props, 'size'>>`
  width: ${p => (p.size === 's' ? p.theme.spacing.unit(8) : p.theme.spacing.unit(10))}px;
`;

const background = css<Pick<Props, 'disabled'>>`
  background-color: ${p =>
    p.disabled ? p.theme.color.disabledBackground : p.theme.color.backgroundInput};
`;

const hoverBorderStyles = css<Pick<Props, 'disabled'>>`
  ${p =>
    p.disabled
      ? ''
      : `
      &:hover {
        border-color: ${p.theme.color.inputBorderHover};
        z-index: 1;
      }
`}
`;

const focusBorderStyles = css<Pick<Props, 'error'>>`
  &:focus {
    border-color: ${p =>
      hasError(p.error) ? p.theme.color.inputBorderError : p.theme.color.borderActive};
    z-index: 1;
  }
`;

const borderStyles = css<Pick<Props, 'error' | 'success'>>`
  outline: none;
  border: 1px solid
    ${p => {
      if (hasError(p.error)) return p.theme.color.inputBorderError;
      if (p.success) return p.theme.color.inputBorderSuccess;
      return p.theme.color.inputBorder;
    }};
  position: relative;
  ${hoverBorderStyles}
  ${focusBorderStyles}
`;

const Stepper = styled.button.attrs({ type: 'button' })`
  ${width}
  ${background}
  ${borderStyles}
  height: 100%;
  padding: 0;
  cursor: pointer;
  box-sizing: border-box;
  flex: 1 0 auto;

  &:active {
    background-color: ${p => p.theme.color.cta};
    color: ${p => p.theme.color.buttonText};
  }
`;

const Input = styled(NormalizedElements.Input).attrs({ type: 'number' })<Partial<Props>>`
  ${background}
  ${borderStyles}
  padding: ${p => p.theme.spacing.unit(2)}px;
  width: 100%;
  height: 100%;
  margin: 0 -1px;
  box-sizing: border-box;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

const stepHandler = step => {
  console.log(step);
};

const components = {
  // InlineFlexbox,
  // HidableTypography,
  // FormFieldFlexbox,
  // Input,
  // DensedTypography,
  // Increment,
  // BottomWrapper,
};

export const Number: React.FC<Props> & {
  /**
   * This will allow you to customize
   * inner parts with styled-components
   * @example
   * const CustomText = styled(Text)`
   *  ${Input} {
   *    color: pink;
   * }
   * `
   * */
  components: typeof components;
} = props => {
  const {
    disabled,
    error,
    success,
    defaultValue,
    value,
    fieldId,
    size,
    step,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    onKeyUp,
    onKeyPress,
  } = props;

  return (
    <FormField {...props}>
      <Flexbox container alignItems="center">
        <Stepper onClick={() => stepHandler(-step)} size={size} disabled={disabled}>
          -
        </Stepper>
        <Input
          {...{
            error,
            success,
            value,
            defaultValue,
            disabled,
            id: fieldId,
            onChange,
            onFocus,
            onClick,
            onBlur,
            onKeyDown,
            onKeyUp,
            onKeyPress,
          }}
          {...(hasError(error) ? { 'aria-invalid': true } : {})}
        />

        <Stepper onClick={() => stepHandler(step)} size={size} disabled={disabled}>
          +
        </Stepper>
      </Flexbox>
    </FormField>
  );
};
Number.components = components;
