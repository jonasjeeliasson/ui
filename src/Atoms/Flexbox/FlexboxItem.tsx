import React from 'react';
import styled from 'styled-components';
import * as R from 'ramda';
import { Props, PropsWithGutter } from './FlexboxItem.types';

const isNumber = (x: any): x is number => x === parseInt(x, 10);
const isUndefined = (x: any): x is undefined => typeof x === 'undefined';

const getSize = (size: Props['size']) => {
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

const StyledItem = styled.div<Props>`
  box-sizing: border-box;
  ${({ size }) => size && getSize(size)}
  ${({ order }) => (order ? `order: ${order};` : '')}
  ${({ grow }) => (grow ? `flex-grow: ${grow};` : '')}
  ${({ shrink }) => (shrink ? `flex-shrink: ${shrink};` : '')}
  ${({ basis }) => (basis ? `flex-basis: ${basis};` : '')}
  ${({ flex }) => (flex ? `flex: ${flex};` : '')}
  ${({ align }) => (align ? `align-self: ${align};` : '')}
`;

const StyledItemWithHorisontalGutter = styled(StyledItem)<PropsWithGutter>`
  ${props => {
    const { gutter = props.theme.spacing.gutter } = props;

    return `
      padding-left: ${props.theme.spacing.unit(gutter / 2)}px;
      padding-right: ${props.theme.spacing.unit(gutter / 2)}px;
    `;
  }}
`;

const StyledItemWithVerticalGutter = styled(StyledItem)<PropsWithGutter>`
  ${props => {
    const { gutter = props.theme.spacing.gutter } = props;

    return `
      padding-top: ${props.theme.spacing.unit(gutter / 2)}px;
      padding-bottom: ${props.theme.spacing.unit(gutter / 2)}px;
    `;
  }}
`;

const withoutSCProps = R.omit(['css']);

export const ItemWithHorisontalGutter: React.FunctionComponent<PropsWithGutter> = props => (
  <StyledItemWithHorisontalGutter {...withoutSCProps(props)} />
);
ItemWithHorisontalGutter.displayName = 'Flexbox.Item';
export const ItemWithVerticalGutter: React.FunctionComponent<PropsWithGutter> = props => (
  <StyledItemWithVerticalGutter {...withoutSCProps(props)} />
);
ItemWithVerticalGutter.displayName = 'Flexbox.Item';

export const Item: React.FunctionComponent<Props> = props => (
  <StyledItem {...withoutSCProps(props)} />
);
Item.displayName = 'Flexbox.Item';
