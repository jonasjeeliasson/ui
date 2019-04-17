import React from 'react';
import styled from 'styled-components';
import { Props } from './TabTitle.types';

const StyledDiv = styled.div<Props>`
  background: none;
  display: inline-block;
  border: none;
  margin: 0;
  padding: 0;
  padding-bottom: ${props => props.theme.spacing.unit(1)}px;
  color: ${props => props.theme.color.text};
  border-bottom: 2px solid
    ${props => (props.active ? props.theme.color.borderActive : 'transparent')};
`;

export const TabTitle: React.FC<Props> = ({ active = false, children }) => {
  return <StyledDiv active={active}>{children}</StyledDiv>;
};
TabTitle.displayName = 'TabTitle';
