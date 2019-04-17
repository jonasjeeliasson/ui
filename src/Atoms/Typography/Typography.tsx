import React from 'react';
import styled, { ThemedStyledProps } from 'styled-components';
import { Theme } from '../../theme/theme.types';
import { Props, Types } from './Typography.types';
import { assert } from '../../common/utils';

const WEIGHTS = {
  regular: 400,
  bold: 700,
  extrabold: 800,
};

const SMALL_DEVICE_BP = 'xs';

const getColor = (props: ThemedStyledProps<Props, Theme>) => {
  const { color, theme } = props;

  if (color && typeof color === 'function') {
    return color(theme);
  }

  if (color === 'inherit') {
    return 'inherit';
  }

  return theme.color.text;
};

export const TYPOGRAPHY_TYPES: Record<Types, Types> = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  caption: 'caption',
  title1: 'title1',
  title2: 'title2',
  title3: 'title3',
  hero: 'hero',
};

const getTypeStyles = (props: ThemedStyledProps<Props, Theme>) => {
  const { type, weight, theme } = props;
  let sizeMobile;
  let sizeDesktop;
  let defaultWeight;
  let allowedWeights = ['regular', 'bold', 'extrabold'];

  switch (type) {
    case TYPOGRAPHY_TYPES.primary:
      sizeMobile = 14;
      sizeDesktop = 16;
      defaultWeight = 'regular';
      break;
    case TYPOGRAPHY_TYPES.secondary:
      sizeMobile = 12;
      sizeDesktop = 14;
      defaultWeight = 'regular';
      allowedWeights = ['regular', 'bold'];
      break;
    case TYPOGRAPHY_TYPES.tertiary:
      sizeMobile = 10;
      sizeDesktop = 12;
      defaultWeight = 'regular';
      allowedWeights = ['regular', 'bold'];
      break;
    case TYPOGRAPHY_TYPES.caption:
      sizeMobile = 10;
      sizeDesktop = 10;
      defaultWeight = 'regular';
      allowedWeights = ['regular', 'bold'];
      break;
    case TYPOGRAPHY_TYPES.title1:
      sizeMobile = 30;
      sizeDesktop = 32;
      defaultWeight = 'extrabold';
      break;
    case TYPOGRAPHY_TYPES.title2:
      sizeMobile = 20;
      sizeDesktop = 24;
      defaultWeight = 'extrabold';
      break;
    case TYPOGRAPHY_TYPES.title3:
      sizeMobile = 18;
      sizeDesktop = 20;
      defaultWeight = 'extrabold';
      break;
    case TYPOGRAPHY_TYPES.hero:
      sizeMobile = 46;
      sizeDesktop = 48;
      defaultWeight = 'extrabold';
      allowedWeights = ['bold', 'extrabold'];
      break;
    default:
      sizeMobile = 14;
      sizeDesktop = 16;
      defaultWeight = 'regular';
  }

  assert(
    allowedWeights.includes(weight || defaultWeight),
    `"${weight}" is not one of the allowed weights for ${type}: ${allowedWeights
      .map(s => `"${s}"`)
      .join(', ')}`,
  );
  return `
    font-weight ${
      weight && allowedWeights.includes(weight) ? WEIGHTS[weight] : WEIGHTS[defaultWeight]
    };
    font-size: ${sizeMobile}px;

    ${theme.media.greaterThan(theme.size[SMALL_DEVICE_BP])} {
      font-size: ${sizeDesktop}px;
    }
  `;
};

const StyledTypography = styled.span<Props>`
  font-family: 'Nordnet Sans Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    sans-serif;
  color: ${p => getColor(p)};
  ${p => getTypeStyles(p)}
` as React.FC<Props>;

export const Typography: React.FC<Props> = props => {
  const { as, className, children, color, type, weight } = props;

  return (
    <StyledTypography className={className} as={as} color={color} type={type} weight={weight}>
      {children}
    </StyledTypography>
  );
};
