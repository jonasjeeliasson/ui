import React from 'react';
import styled from 'styled-components';
import { SeparatorComponent, StyledProps } from './Separator.types';

const StyledSeparator = styled.div<StyledProps>`
  width: ${p => (p.vertical ? '1px' : '100%')};
  height: ${p => (p.vertical ? '100%' : '1px')};
  background-color: ${p => (p.colorFunction ? p.colorFunction(p.theme) : p.theme.color.divider)};
`;

export const Separator: SeparatorComponent = props => (
  <StyledSeparator colorFunction={props.color} vertical={props.vertical} />
);
