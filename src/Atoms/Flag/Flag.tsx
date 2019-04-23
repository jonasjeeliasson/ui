import React from 'react';
import styled from 'styled-components';
import flags from './flags';
import { FlagComponent, Props } from './Flag.types';
import { assert } from '../../common/utils';

const StyledFlag = styled.svg<Props>`
  width: ${p => p.theme.spacing.unit(p.width || 5)}px;
  height: ${p => p.theme.spacing.unit(p.height || 5)}px;
  vertical-align: middle;
`;

export const Flag: FlagComponent = props => {
  assert(Boolean(props.country), 'Flag: You need to supply a country code');
  const Component = props.country ? flags[props.country.toLowerCase()] : null;

  return Component ? (
    <StyledFlag role="img" as={Component} width={props.width} height={props.height} />
  ) : null;
};
