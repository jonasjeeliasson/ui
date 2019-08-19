import React from 'react';
import styled, { css } from 'styled-components';
import { VisuallyHiddenComponent } from './VisuallyHidden.types';

export const visuallyHiddenCss = css`
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
`;

const Hidden = styled.div`
  ${visuallyHiddenCss}
`;

export const VisuallyHidden: VisuallyHiddenComponent = ({ children, as }) => (
  <Hidden as={as}>{children}</Hidden>
);
