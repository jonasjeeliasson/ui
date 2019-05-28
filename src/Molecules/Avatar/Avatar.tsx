import React from 'react';
import styled from 'styled-components';
import { Props } from './Avatar.types';

import Typography from '../../Atoms/Typography';

const StyledDiv = styled.div`
  background-color: ${p => p.theme.color.backgroundDark};
  width: ${p => p.theme.spacing.unit(8)}px;
  height: ${p => p.theme.spacing.unit(8)}px;
  border-radius: 50%;
  line-height: ${p =>
    p.theme.spacing.unit(8) - 1}px; /* FIXME: font is buggy, so baseline is 1px off */
  text-align: center;
`;

export const Avatar: React.FunctionComponent<Props> = ({ children }) => (
  <StyledDiv>
    <Typography type="tertiary" color={t => t.color.textLight}>
      {children}
    </Typography>
  </StyledDiv>
);
