import React from 'react';
import styled from 'styled-components';
import { SeparatorComponent, Props } from './Separator.types';

const StyledSeparator = styled.div<Props>`
  width: ${p => (p.vertical ? '1px' : '100%')};
  height: ${p => (p.vertical ? '100%' : '1px')};
  min-height: '1px';
  min-width: '1px';
  background-color: ${p => p.theme.color.divider};
`;

export const Separator: SeparatorComponent = props => <StyledSeparator vertical={props.vertical} />;
