import React from 'react';
import styled, { css } from 'styled-components';
import R from 'ramda';
import { Theme } from '../../theme/theme.types';
import { Props } from './Flexbox.types';

const isNumber = (x: any): x is number => x === parseInt(x, 10);
const isUndefined = (x: any): x is undefined => typeof x === 'undefined';

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

const getGutterStyles = ({
  direction = 'row',
  theme,
  gutter = theme.spacing.gutter,
}: {
  theme: Theme;
  direction?: Props['direction'];
  gutter?: Props['gutter'];
}) => {
  return direction === 'row' || direction === 'row-reverse'
    ? `
    margin-top: 0;
    margin-left: ${theme.spacing.unit(gutter)}px;
    `
    : `
      margin-left: 0;
      margin-top: ${theme.spacing.unit(gutter)}px;
    `;
};

const getContainerStyles = (p: Props & { theme: Theme }) => `
display: flex;
${p.height ? `height: ${p.height};` : ''}
${p.direction ? `flex-direction: ${p.direction};` : ''}
${p.wrap ? `flex-wrap: ${p.wrap};` : ''}
${p.justifyContent ? `justify-content: ${p.justifyContent};` : ''}
${p.alignItems ? `align-items: ${p.alignItems};` : ''}
${p.alignContent ? `align-content: ${p.alignContent};` : ''}
${
  p.gutter
    ? `
  & > *:not(:first-child) {
    ${getGutterStyles(p)}
  }
`
    : ''
}
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
  'basis',
  'order',
]);
const SanitizedDiv = (props: Props) => <div {...sanitizeProps(props)} />;

const getStylesForSize = (size: string) => css<Partial<Props>>`
  ${p => p.theme.media.greaterThan(p.theme.size[size])} {
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
