import React from 'react';
import styled, { ThemedStyledProps } from 'styled-components';
import Color from 'color';
import { Link as RouterLink } from 'react-router-dom';
import { ButtonComponent, ButtonProps, LinkProps } from './Button.types';
import { Theme } from '../../theme/theme.types';
import { isUndefined, assert } from '../../common/utils';
import NormalizedElements from '../../common/NormalizedElements';
import { Typography } from '../..';

const HEIGHT = {
  s: 6,
  m: 8,
  l: 10,
};

const BORDER_SIZE = 2;

const isSecondary = (variant: ButtonProps['variant']) => variant === 'secondary';

const getBackgroundColor = (props: ThemedStyledProps<ButtonProps | LinkProps, Theme>) => {
  const { disabled, theme, variant, color: colorFn } = props;
  if (disabled) {
    return `background-color: ${theme.color.disabled};`;
  }

  if (variant === 'secondary') {
    if (colorFn) {
      const color = colorFn(theme);
      assert(
        color === theme.color.cta || color === theme.color.negative,
        'Button: color is incorrect, use only `t => t.color.cta` or `t => t.color.negative`',
      );
      return `
      background-color: ${theme.color.buttonSecondaryBackground};
      &:hover{
          background-color: ${Color(color).darken(0.1)};
          color: ${theme.color.buttonText};
      }
      &:active{
          background-color: ${Color(color).darken(0.2)};
      }
  `;
    }
    return `
        background-color: ${theme.color.buttonSecondaryBackground};
        &:hover{
            background-color: ${Color(theme.color.cta).darken(0.1)};
            color: ${theme.color.buttonText};
        }
        &:active{
            background-color: ${Color(theme.color.cta).darken(0.2)};
        }
    `;
  }

  if (colorFn) {
    const color = colorFn(theme);
    assert(
      color === theme.color.cta || color === theme.color.negative,
      'Button: color is incorrect, use only `t => t.color.cta` or `t => t.color.negative`',
    );

    return `
    background-color: ${color};
    &:hover{
        background-color: ${Color(color).darken(0.1)};
        color: ${theme.color.buttonText};
    }
    &:active{
        background-color: ${Color(color).darken(0.2)};
    }
`;
  }

  return `
        background-color: ${theme.color.cta};
        &:hover{
            background-color: ${Color(theme.color.cta).darken(0.1)};
        }
        &:active{
            background-color: ${Color(theme.color.cta).darken(0.2)};
        }
    `;
};

const getHeight = (props: ThemedStyledProps<ButtonProps | LinkProps, Theme>) => {
  const { theme, size } = props;
  const hugeness = isUndefined(size) ? HEIGHT.m : HEIGHT[size];

  return theme.spacing.unit(hugeness);
};

const getSharedStyle = (props: ThemedStyledProps<ButtonProps | LinkProps, Theme>) => {
  const { theme, variant, fullWidth, color: colorFn } = props;
  const height = getHeight(props);

  const color = colorFn && colorFn(theme);
  const getColorWithDefault = (defaultColor: string) =>
    isSecondary(variant) ? color || theme.color.cta : defaultColor;

  if (color) {
    assert(
      color === theme.color.cta || color === theme.color.negative,
      'Button: color is incorrect, use only `t => t.color.cta` or `t => t.color.negative`',
    );
  }

  return `
    ${getBackgroundColor(props)}
    box-sizing: border-box;
    border: ${BORDER_SIZE}px solid ${getColorWithDefault('transparent')};
    color: ${getColorWithDefault(theme.color.buttonText)};
    height: ${height}px;
    line-height: ${height - BORDER_SIZE * 2}px;
    padding: 0 ${theme.spacing.unit(2)}px;
    ${fullWidth ? `display: block; width: 100%;` : `display: inline-block;`}
  `;
};

const StyledButton = styled(NormalizedElements.Button)<ButtonProps>`
  ${p => getSharedStyle(p)}
  border-radius: 0;
  cursor: pointer;
`;

const StyledLink = styled(RouterLink)<LinkProps>`
  ${p => getSharedStyle(p)}
  text-decoration: none;
  text-align: center;
`;

export const Button: ButtonComponent = props => {
  const typeIsNotPresent = typeof props.type === 'undefined';
  const {
    disabled,
    onClick,
    size,
    type = 'button',
    variant,
    fullWidth,
    to,
    children,
    rel,
    color,
  } = props;
  const toAndDisabledAreNotPresentTogether = !(to && disabled);

  assert(
    toAndDisabledAreNotPresentTogether,
    "Button: You're using `to` prop together with `disabled` prop. Link's can't be disabled",
    { level: 'warn' },
  );

  if (to && !disabled) {
    assert(
      typeIsNotPresent,
      "Button: You're using `type` prop together with `to` prop. Link dont have `type` that's why it's omitted",
      { level: 'warn' },
    );

    return (
      <StyledLink
        to={to}
        rel={rel}
        onClick={onClick}
        size={size}
        variant={variant}
        fullWidth={fullWidth}
      >
        <Typography type={size === 'l' ? 'primary' : 'secondary'} color="inherit">
          {children}
        </Typography>
      </StyledLink>
    );
  }

  return (
    <StyledButton
      disabled={disabled}
      onClick={onClick}
      size={size}
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      color={color}
    >
      <Typography type={size === 'l' ? 'primary' : 'secondary'} color="inherit">
        {children}
      </Typography>
    </StyledButton>
  );
};
