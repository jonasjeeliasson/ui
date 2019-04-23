import React from 'react';
import styled from 'styled-components';
import { TdComponent, Props } from './Td.types';

const StyledTd = styled.td<Props>`
  height: 100%;
  padding: ${p => p.theme.spacing.unit(2)}px ${p => p.theme.spacing.unit(1)}px;
  text-align: ${p => p.textAlign};

  :first-child {
    padding-left: 0;
  }
  :last-child {
    padding-right: 0;
  }
`;

export const Td: TdComponent = ({ textAlign = 'left', children }) => (
  <StyledTd textAlign={textAlign}>{children}</StyledTd>
);
