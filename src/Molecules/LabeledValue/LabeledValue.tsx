import React from 'react';
import styled from 'styled-components';
import { LabeledValueComponent } from './LabeledValue.types';
import Typography from '../../Atoms/Typography';

const StyledLabeledValue = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.div`
  margin-bottom: ${p => p.theme.spacing.unit(1)}px;
`;

export const LabeledValue: LabeledValueComponent = props => (
  <StyledLabeledValue>
    <StyledLabel>
      <Typography type="secondary" color={t => t.color.label}>
        {props.label}
      </Typography>
    </StyledLabel>
    {props.children}
  </StyledLabeledValue>
);
