import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { LinkComponent, Props } from './Link.types';
import { assert } from '../../common/utils';

const StyledLink = styled(RouterLink)<Props>`
  color: ${p => p.theme.color.cta};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const Link: LinkComponent = props =>
  assert(typeof props.to !== 'undefined', 'Link: You forgot to specify `to` property') && (
    <StyledLink
      className={props.className}
      onClick={props.onClick}
      to={props.to}
      target={props.target}
    >
      {props.children}
    </StyledLink>
  );
