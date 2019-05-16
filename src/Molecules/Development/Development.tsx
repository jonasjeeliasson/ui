import React from 'react';
import styled from 'styled-components';
import { DevelopmentProps, DevelopmentComponent } from './Development.types';
import { Number as NumberComponent } from '../..';
import { Theme } from '../../theme/theme.types';
import { getRoundedValue } from '../../Atoms/Number/Number';

const getPrefix = (value?: number | null) => {
  if (!value) return '';
  return value > 0 ? '▲' : '▼';
};

const getColor = ({ value, theme }: { value?: number; theme: Theme }) => {
  if (!value) return theme.color.text;
  return value > 0 ? theme.color.positive : theme.color.negative;
};

const StyledDevelopment = styled.span<DevelopmentProps>`
  color: ${getColor};
`;

const Development: DevelopmentComponent = props => {
  const { value, decimals, ticks, className, icon = false, } = props;
  const roundedValue = typeof value !== 'undefined' && value !== null ? getRoundedValue(value, ticks, decimals) : value;
  return (
    <StyledDevelopment className={className} value={roundedValue}>
      <span aria-hidden>{icon && getPrefix(roundedValue)}</span>
      <NumberComponent sign {...props} />
    </StyledDevelopment>
  )
};

export { Development };
Development.displayName = 'Development';
