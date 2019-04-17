import React from 'react';
import styled from 'styled-components';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { DevelopmentProps } from './Development.types';
import { Theme } from '../../theme/theme.types';

const getPrefix = (value: number) => {
  if (value > 0) return '▲';
  if (value < 0) return '▼';
  return '';
};

const getColor = ({ value, theme }: { value: number; theme: Theme }) => {
  if (value > 0) {
    return theme.color.positive;
  }

  if (value < 0) {
    return theme.color.negative;
  }
  return theme.color.text;
};

const StyledDevelopment = styled.span<DevelopmentProps>`
  color: ${getColor};
`;

const FormattedDevelopment: React.FC<DevelopmentProps & InjectedIntlProps> = ({
  value,
  intl,
  className,
}) => (
  <StyledDevelopment className={className} value={value}>
    {getPrefix(value)}
    {value > 0 ? '+' : null}
    {intl.formatNumber(value)}
    {'%'}
  </StyledDevelopment>
);

export const Development = injectIntl(FormattedDevelopment);
Development.displayName = 'Development';
