import React from 'react';
import R from 'ramda';
import styled, { ThemedStyledProps } from 'styled-components';
import { Theme } from '../../theme/theme.types';
import { Props, Types, FontProps } from './Typography.types';
import { assert, pickAriaAttributes } from '../../common/utils';

const WEIGHTS = {
  regular: 400,
  bold: 700,
  extrabold: 800,
};

const SMALL_DEVICE_BP = 'sm';

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
  const { type, weight, theme, lineHeight } = props;
  let mobile: FontProps = null;
  let desktop: FontProps = null;
  let defaultWeight;
  let allowedWeights = ['regular', 'bold', 'extrabold'];

  switch (type) {
    case TYPOGRAPHY_TYPES.primary:
      mobile = {
        size: 16,
        lineHeight: theme.spacing.unit(6),
      };
      defaultWeight = 'regular';
      break;
    case TYPOGRAPHY_TYPES.secondary:
      mobile = {
        size: 14,
        lineHeight: theme.spacing.unit(5),
      };
      defaultWeight = 'regular';
      allowedWeights = ['regular', 'bold'];
      break;
    case TYPOGRAPHY_TYPES.tertiary:
      mobile = {
        size: 12,
        lineHeight: theme.spacing.unit(4),
      };
      defaultWeight = 'regular';
      allowedWeights = ['regular', 'bold'];
      break;
    case TYPOGRAPHY_TYPES.caption:
      mobile = {
        size: 10,
        lineHeight: theme.spacing.unit(4),
      };
      defaultWeight = 'regular';
      allowedWeights = ['regular', 'bold'];
      break;
    case TYPOGRAPHY_TYPES.title1:
      mobile = {
        size: 24,
        lineHeight: theme.spacing.unit(7),
      };
      desktop = {
        size: 28,
        lineHeight: theme.spacing.unit(8),
      };
      defaultWeight = 'extrabold';
      break;
    case TYPOGRAPHY_TYPES.title2:
      mobile = {
        size: 20,
        lineHeight: theme.spacing.unit(6),
      };
      desktop = {
        size: 24,
        lineHeight: theme.spacing.unit(7),
      };
      defaultWeight = 'extrabold';
      break;
    case TYPOGRAPHY_TYPES.title3:
      mobile = {
        size: 18,
        lineHeight: theme.spacing.unit(6),
      };
      desktop = {
        size: 20,
        lineHeight: theme.spacing.unit(6),
      };
      defaultWeight = 'extrabold';
      break;
    case TYPOGRAPHY_TYPES.hero:
      mobile = {
        size: 46,
        lineHeight: theme.spacing.unit(12),
      };
      desktop = {
        size: 48,
        lineHeight: theme.spacing.unit(13),
      };
      defaultWeight = 'extrabold';
      allowedWeights = ['bold', 'extrabold'];
      break;
    default:
      mobile = {
        size: 16,
        lineHeight: theme.spacing.unit(6),
      };
      defaultWeight = 'regular';
  }

  const getFontSize = (mode: Exclude<FontProps, null>) => {
    return `${mode.size ? `font-size: ${mode.size}px;` : ''}`;
  };

  const getLineHeight = (mode: Exclude<FontProps, null>) => {
    if (lineHeight) {
      return 'inherit';
    }

    return `${mode.lineHeight ? `line-height: ${mode.lineHeight / mode.size};` : ''}`;
  };

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
    ${getFontSize(mobile)}
    ${getLineHeight(mobile)}

    ${
      desktop
        ? `
          ${theme.media.greaterThan(theme.breakpoints[SMALL_DEVICE_BP])} {
            ${getFontSize(desktop)}
            ${getLineHeight(desktop)}
          }
        `
        : ''
    }
    
  `;
};
const CleanSpan = (props: any) => (
  <span {...R.omit(['color', 'type', 'weight', 'lineHeight'])(props)} />
);
const StyledTypography = styled(CleanSpan)<Props>`
  font-family: 'Nordnet Sans Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    sans-serif;
  color: ${p => getColor(p)};
  margin: 0;
  ${p => getTypeStyles(p)}
` as React.FC<Props>;

export const Typography: React.FC<Props> = props => {
  const { as, className, children, color, type, weight, lineHeight } = props;

  return (
    <StyledTypography
      className={className}
      as={as}
      color={color}
      type={type}
      weight={weight}
      lineHeight={lineHeight}
      {...pickAriaAttributes(props)}
    >
      {children}
    </StyledTypography>
  );
};
