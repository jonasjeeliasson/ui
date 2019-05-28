import React from 'react';
import styled from 'styled-components';
import * as R from 'ramda';
import { DevelopmentProps, DevelopmentComponent } from './Development.types';
import { Number as NumberComponent } from '../..';
import { Theme } from '../../theme/theme.types';
import { getRoundedValue } from '../Number/Number';

const getPrefix = (value?: number | null) => {
  if (!value) return '';
  return value > 0 ? '▲' : '▼';
};

const getColor = ({ value, theme }: { value?: number; theme: Theme }) => {
  if (!value || !Number.isFinite(value)) return theme.color.text;
  return value > 0 ? theme.color.positive : theme.color.negative;
};

const StyledDevelopment = styled.span<DevelopmentProps>`
  color: ${getColor};
`;

const Development: DevelopmentComponent = props => {
  const {
    value,
    decimals,
    maximumDecimals,
    minimumDecimals,
    ticks,
    className,
    icon = false,
  } = props;
  const roundedValue = !R.isNil(value)
    ? getRoundedValue(value, { ticks, decimals, maximumDecimals, minimumDecimals })
    : value;
  return (
    <StyledDevelopment className={className} value={roundedValue}>
      <span aria-hidden>{icon && getPrefix(roundedValue)}</span>
      <NumberComponent sign {...props} />
    </StyledDevelopment>
  );
};

export { Development };
Development.displayName = 'Development';
