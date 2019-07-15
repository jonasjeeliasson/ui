import React from 'react';
import styled, { css } from 'styled-components';
import R from 'ramda';
import { Theme } from '../../theme/theme.types';
import { Props } from './Flexbox.types';
import { isUndefined } from '../../common/utils';

const isNumber = (x: any): x is number => x === parseInt(x, 10);

const getSizeStyles = (size: Props['size']) => {
  const oneCol = 100 / 12;

  if (isUndefined(size)) {
    return null;
  }

  if (isNumber(size)) {
    const percentage = `${oneCol * size}%`;

    return `
      max-width: ${percentage};
      flex-basis: ${percentage};
    `;
  }

  return `
    max-width: ${size};
    flex-basis: ${size};
  `;
};

const getGutterStyles = (theme: Theme, gutter: Exclude<Props['gutter'], undefined>) => {
  return `
    margin: -${theme.spacing.unit(gutter / 2)}px;

    & > * {
      padding: ${theme.spacing.unit(gutter / 2)}px;
    }
  `;
};

const getContainerStyles = (p: Props & { theme: Theme }) => `
  display: flex;
  ${p.height ? `height: ${p.theme.spacing.unit(p.height)}px;` : ''}
  ${p.direction ? `flex-direction: ${p.direction};` : ''}
  ${p.wrap ? `flex-wrap: ${p.wrap};` : ''}
  ${p.justifyContent ? `justify-content: ${p.justifyContent};` : ''}
  ${p.alignItems ? `align-items: ${p.alignItems};` : ''}
  ${p.alignContent ? `align-content: ${p.alignContent};` : ''}
  ${p.gutter ? getGutterStyles(p.theme, p.gutter) : ''}
`;

const getItemStyles = (p: Props & { theme: Theme }) => `
  ${p.size ? getSizeStyles(p.size) : ''}
  ${!R.isNil(p.order) ? `order: ${p.order};` : ''}
  ${!R.isNil(p.grow) ? `flex-grow: ${p.grow};` : ''}
  ${!R.isNil(p.shrink) ? `flex-shrink: ${p.shrink};` : ''}
  ${p.basis ? `flex-basis: ${p.basis};` : ''}
  ${p.flex ? `flex: ${p.flex};` : ''}
  ${p.align ? `align-self: ${p.align};` : ''}
`;

const sanitizeProps = R.omit([
  'align',
  'size',
  'height',
  'direction',
  'wrap',
  'container',
  'item',
  'gutter',
  'alignItems',
  'grow',
  'shrink',
  'sm',
  'md',
  'lg',
  'xl',
  'basis',
  'order',
  'justifyContent',
]);
const SanitizedDiv = (props: Props) => <div {...sanitizeProps(props)} />;

const getStylesForSize = (size: string) => css<Partial<Props>>`
  ${p => p.theme.media.greaterThan(p.theme.breakpoints[size])} {
    ${p => (p.container ? getContainerStyles({ ...p, ...p[size] }) : '')}
    ${p => (p.item ? getItemStyles({ ...p, ...p[size] }) : '')}
  }
`;

const StyledFlexbox = styled(SanitizedDiv)<Props>`
  box-sizing: border-box;
  ${p => (p.container ? getContainerStyles(p) : '')}
  ${p => (p.item ? getItemStyles(p) : '')}
  ${p => (p.sm ? getStylesForSize('sm') : '')}
  ${p => (p.md ? getStylesForSize('md') : '')}
  ${p => (p.lg ? getStylesForSize('lg') : '')}
`;

export const Flexbox: React.FC<Props> = props => <StyledFlexbox {...props} />;

Flexbox.displayName = 'Flexbox';
