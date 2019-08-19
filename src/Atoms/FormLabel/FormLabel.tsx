import React from 'react';
import styled, { css } from 'styled-components';
import { Props } from './FormLabel.types';

import { Typography } from '../../..';

const visuallyHidden = css`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

const StyledLabel = styled.label`
  ${p => (p.hidden ? visuallyHidden : '')}
`;

const StyledTypography = styled(Typography)`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FormLabel: React.FC<Props> = ({ children, forId, hideLabel }) => (
  <StyledLabel htmlFor={forId} hidden={Boolean(hideLabel)}>
    <StyledTypography type="secondary" color={t => t.color.label}>
      {children}
    </StyledTypography>
  </StyledLabel>
);
