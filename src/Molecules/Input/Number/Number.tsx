import React, { useState, useRef } from 'react';
import { injectIntl } from 'react-intl';
import styled, { css } from 'styled-components';
import { Props, NumberComponent } from './Number.types';
import { Flexbox, VisuallyHidden, Icon } from '../../..';
import { FormFieldSimple } from '../FormFieldSimple';
import NormalizedElements from '../../../common/NormalizedElements';
import { getStringAsNumber } from './utils';
import { isNumber } from '../../../common/utils';
import adjustValue from './adjustValue';

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
        z-index: 2;
      }
`}
`;

const focusBorderStyles = css<Pick<Props, 'error'>>`
  &:focus {
    border-color: ${p =>
      hasError(p.error) ? p.theme.color.inputBorderError : p.theme.color.borderActive};
    z-index: 3;
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 auto;

  &:active {
    background-color: ${p => p.theme.color.cta};

    svg {
      fill: ${p => p.theme.color.buttonText};
    }
  }

  &:first-of-type {
    order: -1;
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
  z-index: 1;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none; /* stylelint-disable-line property-no-vendor-prefix */
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield; /* stylelint-disable-line property-no-vendor-prefix */
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
    autoFocus,
    defaultValue = 0,
    disabled,
    error,
    fieldId,
    intl,
    max,
    min = 0,
    name,
    noSteppers,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    onStepDown = () => {},
    onStepUp = () => {},
    required,
    size,
    step = 1,
    success,
    value: controlledValue,
  } = props;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const isControlled = controlledValue && controlledValue >= 0;
  const sanitized = {
    max: max ? getStringAsNumber(max) : undefined,
    min: min ? getStringAsNumber(min) : undefined,
    step: isNumber(step) ? step : getStringAsNumber(step),
    uncontrolledValue: getStringAsNumber(uncontrolledValue),
  };

  const getUpdateValue = (increment: boolean) => {
    return adjustValue({
      originalValue: sanitized.uncontrolledValue,
      step: sanitized.step,
      min: sanitized.min,
      max: sanitized.max,
      shouldIncrement: increment,
      intl,
    });
  };

  const onStepHandler = (stepUp: boolean) => {
    let updatedValue;

    if (!isControlled) {
      updatedValue = getUpdateValue(stepUp);
      setUncontrolledValue(updatedValue);
    }

    if (stepUp) {
      if (onStepUp) {
        onStepUp(updatedValue);
      }
    } else if (onStepDown) {
      onStepDown(updatedValue);
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledValue(e.target.value);
    }

    if (onChange) {
      onChange(e);
    }
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isControlled) {
      const { key } = e;
      const upKey = 'ArrowUp';
      const downKey = 'ArrowDown';

      if (key === upKey || key === downKey) {
        e.preventDefault();
        onStepHandler(key === upKey);
      }
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    <FormFieldSimple {...props}>
      <Flexbox container item grow={1} alignItems="center">
        <Input
          {...{
            autoFocus,
            disabled,
            error,
            id: fieldId,
            max,
            min,
            name,
            onBlur,
            onChange: onChangeHandler,
            onClick,
            onFocus,
            onKeyDown: onKeyDownHandler,
            onKeyPress,
            onKeyUp,
            ref: inputRef,
            required,
            step,
            success,
            value: controlledValue || uncontrolledValue,
          }}
          {...(hasError(error) ? { 'aria-invalid': true } : {})}
        />
        {!noSteppers && (
          <Stepper onClick={() => onStepHandler(false)} size={size} disabled={disabled}>
            <VisuallyHidden>decrease number by {step}</VisuallyHidden>
            <Icon.Minus size={3} />
          </Stepper>
        )}
        {!noSteppers && (
          <Stepper onClick={() => onStepHandler(true)} size={size} disabled={disabled}>
            <VisuallyHidden>increase number by {step}</VisuallyHidden>
            <Icon.Plus size={3} />
          </Stepper>
        )}
      </Flexbox>
    </FormFieldSimple>
  );
};

NumberInput.components = components;

export default injectIntl(NumberInput);
