import React from 'react';
import styled, { css } from 'styled-components';
import { Props } from './Number.types';
import { Flexbox } from '../../..';
import { FormField } from '../FormField';
import NormalizedElements from '../../../common/NormalizedElements';

const hasError = (error?: Props['error']) => error && error !== '';

const inputBackgroundColor = css<Pick<Props, 'disabled'>>`
  background-color: ${p =>
    p.disabled ? p.theme.color.disabledBackground : p.theme.color.backgroundInput};
`;

const Input = styled(NormalizedElements.Input).attrs({ type: 'number' })<Partial<Props>>`
  ${inputBackgroundColor}
  padding: ${p => p.theme.spacing.unit(2)}px;
  height: 100%;
  width: 100%;
  border: 0;
  outline: none;
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

const Stepper = styled.button.attrs({ type: 'button' })`
  width: ${p => p.theme.spacing.unit(8)}px;
  height: 100%;
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
      <Stepper onClick={() => stepHandler(-step)}>-</Stepper>
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
      <Stepper onClick={() => stepHandler(step)}>+</Stepper>
    </FormField>
  );
};
Number.components = components;
