import React from 'react';
import styled from 'styled-components';
import { TheadComponent, Props } from './Thead.types';

const StyledThead = styled.thead<Props>`
  width: 100%;
  border-bottom: 1px solid ${p => p.theme.color.divider};
`;

const StyledStickyThead = styled(StyledThead)<Props>`
  border: 0;
  th {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: ${p => p.theme.color.card};
  }
  th:before {
    left: 0;
    width: 100%;
    bottom: 0;
    height: 100%;
    content: '';
    position: absolute;
    border-bottom: 1px solid ${p => p.theme.color.divider};
  }
`;

export const Thead: TheadComponent = ({ stickyHeader = false, children }) =>
  stickyHeader ? (
    <StyledStickyThead>{children}</StyledStickyThead>
  ) : (
    <StyledThead>{children}</StyledThead>
  );
