import React from 'react';
import styled from 'styled-components';
import { TbodyComponent } from './Tbody.types';

const StyledTbody = styled.tbody`
  width: 100%;
  overflow: 'auto';
  @supports (-webkit-overflow-scrolling: touch):  {
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
`;

export const Tbody: TbodyComponent = ({ children }) => <StyledTbody>{children}</StyledTbody>;
