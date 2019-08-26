import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import styled, { css } from 'styled-components';
import { Props, NumberComponent } from './Number.types';
import { Flexbox } from '../../..';
import { FormField } from '../FormField';
import { getStringAsNumber } from './utils';
import adjustValue from './adjustValue';
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

const Stepper = styled.button.attrs({ type: 'button' })<Partial<Props>>`
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

const components = {
  Input,
  Stepper,
};

const NumberInput: NumberComponent & {
  /**
   * This will allow you to customize
   * inner parts with styled-components
   * @example
   * const CustomNumberInput = styled(Input.Number)`
   *  ${CustomNumberInput} {
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
    defaultValue = 0,
    value: controlledValue,
    fieldId,
    intl,
    size,
    step = 1,
    min = 0,
    max,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    onStepUp = () => {},
    onStepDown = () => {},
  } = props;
  const normalizedValues = {
    min: getStringAsNumber(min),
    max: getStringAsNumber(max),
    step: getStringAsNumber(step),
    controlledValue: getStringAsNumber(controlledValue),
    defaultValue: getStringAsNumber(defaultValue),
  };

  const [uncontrolledValue, setUncontrolledValue] = useState(normalizedValues.defaultValue);
  const isControlled = controlledValue && controlledValue >= 0;

  const updateValue = (increment: boolean) => {
    const value = adjustValue({
      originalValue: uncontrolledValue,
      step,
      intl,
      min,
      max,
      shouldIncrement: increment,
    });

    setUncontrolledValue(getStringAsNumber(value));
  };

  const stepUpHandler = () => {
    onStepUp();
    !isControlled && updateValue(true);
  };

  const stepDownHandler = () => {
    onStepDown();
    !isControlled && updateValue(false);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    !isControlled && setUncontrolledValue(e.target.value);

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <FormField {...props}>
      <Flexbox container alignItems="center">
        <Stepper onClick={stepDownHandler} size={size} disabled={disabled}>
          -
        </Stepper>
        <Input
          {...{
            error,
            success,
            value: controlledValue || uncontrolledValue,
            defaultValue,
            disabled,
            id: fieldId,
            step,
            min,
            max,
            name,
            onChange: onChangeHandler,
            onFocus,
            onClick,
            onBlur,
            onKeyDown,
            onKeyUp,
            onKeyPress,
          }}
          {...(hasError(error) ? { 'aria-invalid': true } : {})}
        />

        <Stepper onClick={stepUpHandler} size={size} disabled={disabled}>
          +
        </Stepper>
      </Flexbox>
    </FormField>
  );
};
NumberInput.components = components;

export default injectIntl(NumberInput);
