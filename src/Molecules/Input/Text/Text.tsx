import React from 'react';
import styled, { css } from 'styled-components';
import { Props } from './Text.types';
import { Flexbox } from '../../..';
import { FormField } from '../FormField';
import NormalizedElements from '../../../common/NormalizedElements';

const hasError = (error?: Props['error']) => error && error !== '';

const inputBackgroundColor = css<Pick<Props, 'disabled'>>`
  background-color: ${p =>
    p.disabled ? p.theme.color.disabledBackground : p.theme.color.backgroundInput};
`;

const placeholderNormalizaion = css<{ sizeProp: Props['size'] }>`
  &::placeholder {
    /* fixes safari placeholder vertical positioning */
    /* change if typography changes */
    line-height: 17px;
    color: ${p => p.theme.color.label};
  }

  :-ms-input-placeholder {
    /* fixes IE11 placeholder vertical positioning and color */
    line-height: 1;
    color: ${p => p.theme.color.label};
  }

  &::-moz-placeholder {
    /* fixes firefox placeholder vertical positioning */
    /* change if typography changes */
    line-height: ${p => (p.sizeProp === 's' ? '15' : '22')}px;
  }
`;

const UnstyledInput = styled(NormalizedElements.Input).attrs({ type: 'text' })<
  Partial<Props> & { sizeProp: Props['size'] }
>`
  border: 0;
  box-sizing: border-box;
  font-family: inherit;
  font-weight: inherit;
  font-size: inherit;
  color: inherit;
  width: 100%;
  padding: ${p => p.theme.spacing.unit(2)}px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  outline: 0;
  height: 100%;

  ${placeholderNormalizaion}
  ${inputBackgroundColor}
  ${p => (p.leftAddon ? `padding-left: ${p.theme.spacing.unit(8)}px;` : '')}
  ${p =>
    p.rightAddon
      ? `padding-right: ${p.theme.spacing.unit(10)}px;` // compensate for right paddings
      : ''}
`;

const AddonBox = styled(Flexbox)<{ position?: 'left' | 'right' }>`
  width: ${p => p.theme.spacing.unit(8)}px;
  top: 0;
  height: 100%;
  padding-left: ${p => p.theme.spacing.unit(1)}px;
  padding-right: ${p => p.theme.spacing.unit(1)}px;
  position: absolute;
  ${p => (p.position === 'left' ? 'left: 0;' : '')}
  ${p => (p.position === 'right' ? `right: ${p.theme.spacing.unit(1)}px;` : '')}
`;

const components = {
  UnstyledInput,
  AddonBox,
};

export const Text: React.FC<Props> & {
  /**
   * This will allow you to customize
   * inner parts with styled-components
   * @example
   * const CustomText = styled(Input.Text)`
   *  ${UnstyledInput} {
   *    color: pink;
   * }
   * `
   * */
  components: typeof components;
} = props => {
  const {
    disabled,
    error,
    leftAddon,
    placeholder,
    rightAddon,
    success,
    size,
    defaultValue,
    value,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    onKeyUp,
    onKeyPress,
    name,
  } = props;
  /* eslint-disable jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */
  return (
    <FormField {...props}>
      <UnstyledInput
        {...{
          sizeProp: size,
          placeholder,
          error,
          success,
          leftAddon,
          rightAddon,
          value,
          defaultValue,
          disabled,
          onChange,
          onFocus,
          onClick,
          onBlur,
          onKeyDown,
          onKeyUp,
          onKeyPress,
          name,
        }}
        {...(hasError(error) ? { 'aria-invalid': true } : {})}
      />
      {leftAddon && (
        <AddonBox container justifyContent="center" alignItems="center" position="left">
          {leftAddon}
        </AddonBox>
      )}
      {rightAddon && (
        <AddonBox container justifyContent="center" alignItems="center" position="right">
          {rightAddon}
        </AddonBox>
      )}
    </FormField>
  );
};
Text.components = components;
