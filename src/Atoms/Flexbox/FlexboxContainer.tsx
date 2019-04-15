import React from 'react';
import styled, { ThemedStyledProps } from 'styled-components';
import { Theme } from '../../theme/theme.types';
import { ItemWithHorisontalGutter, ItemWithVerticalGutter } from './FlexboxItem';
import { Props as ChildProps } from './FlexboxItem.types';
import { Props } from './FlexboxContainer.types';

const isHorizontalGrid = (dir: Props['direction']) => {
  return dir !== 'column' && dir !== 'column-reverse';
};

const getContainerMargins = (props: ThemedStyledProps<Props, Theme>): string => {
  const { theme, direction, gutter = props.theme.spacing.gutter } = props;
  const negativeGutter = `-${theme.spacing.unit(gutter / 2)}px`;

  if (gutter <= 0) {
    return '';
  }

  if (isHorizontalGrid(direction)) {
    return `
      margin-left: ${negativeGutter};
      margin-right: ${negativeGutter}
    `;
  }

  return `
      margin-top: ${negativeGutter};
      margin-bottom: ${negativeGutter}
  `;
};

const StyledFlexbox = styled.div<Props>`
  box-sizing: border-box;
  display: flex;
  
  ${props => getContainerMargins(props)}
  ${({ height }) => (height ? `height: ${height};` : '')}
  ${({ direction }) => (direction ? `flex-direction: ${direction};` : '')}
  ${({ wrap }) => (wrap ? `flex-wrap: ${wrap};` : '')}
  ${({ justifyContent }) => (justifyContent ? `justify-content: ${justifyContent};` : '')}
  ${({ alignItems }) => (alignItems ? `align-items: ${alignItems};` : '')}
  ${({ alignContent }) => (alignContent ? `align-content: ${alignContent};` : '')}
`;

export const Container = (props: Props) => {
  const { gutter, direction } = props;

  return (
    <StyledFlexbox {...props} gutter={gutter}>
      {React.Children.map(props.children, (child: any) => {
        /** the check below is needed for rendering conditional Flexbox Items, e.g
         * <Flexbox.Container>
         *   {showItem && <Flexbox.Item />}
         *   <Flexbox.Item />
         *  </Flexbox.Container>
         */
        if (!child) {
          return child;
        }

        return isHorizontalGrid(direction) ? (
          <ItemWithHorisontalGutter {...child.props as ChildProps} gutter={gutter} />
        ) : (
          <ItemWithVerticalGutter {...child.props as ChildProps} gutter={gutter} />
        );
      })}
    </StyledFlexbox>
  );
};

Container.displayName = 'Flexbox.Container';
