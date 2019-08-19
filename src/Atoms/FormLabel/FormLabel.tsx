import React from 'react';
import styled from 'styled-components';
import { Props } from './FormLabel.types';
import { Typography } from '../..';
import { visuallyHiddenCss as visuallyHidden } from '../VisuallyHidden';

const StyledLabel = styled.label`
  ${p => (p.hidden ? visuallyHidden : '')}
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FormLabel: React.FC<Props> = ({ children, className, forId, hideLabel }) => (
  <StyledLabel className={className} htmlFor={forId} hidden={Boolean(hideLabel)}>
    <Typography type="secondary" color={t => t.color.label}>
      {children}
    </Typography>
  </StyledLabel>
);
FormLabel.displayName = 'FormLabel';
