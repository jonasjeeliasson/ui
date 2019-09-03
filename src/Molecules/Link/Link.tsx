import R from 'ramda';
import React from 'react';
import styled, { ThemedStyledProps } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { LinkComponent, LinkProps } from './Link.types';
import { Theme } from '../../theme/theme.types';
import { isUndefined } from '../../common/utils';
import NormalizedElements from '../../common/NormalizedElements';

const getSharedStyle = (props: ThemedStyledProps<LinkProps, Theme>) => {
  const { theme, disabled, display = 'inline' } = props;

  // Need to switch to display: inline-block
  // But it will break pages, so need to do it through mutations
  return `
    display: ${display};
    padding: 0;
    color: ${disabled ? theme.color.disabledText : theme.color.cta}

    &:hover {
      text-decoration: underline;
    }
  `;
};

const CleanLink = (props: LinkProps) => {
  return props.external ? (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a {...R.omit(['fullWidth', 'colorFn', 'color', 'display'], props) as any} />
  ) : (
    <RouterLink {...R.omit(['fullWidth', 'colorFn', 'color', 'display'], props) as any} />
  );
};

const StyledLink = styled(CleanLink)<LinkProps>`
  ${p => getSharedStyle(p)}
  text-decoration: none;
`;

const StyledButton = styled(NormalizedElements.Button)<LinkProps>`
  ${p => getSharedStyle(p)}
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  border: none;
  border-radius: 0;

  font-weight: inherit; /* remove when and if typography is handled inside the component */
`;

export const Link: LinkComponent = props => {
  const {
    to,
    children,
    disabled,
    className,
    onClick,
    external,
    target = external ? '_blank' : undefined,
    rel = external ? 'noopener noreferrer nofollow' : undefined,
  } = props;
  const destinationProp = external ? { href: to } : { to };

  if (isUndefined(to) || disabled) {
    return (
      <StyledButton className={className} onClick={onClick} disabled={disabled}>
        {children}
      </StyledButton>
    );
  }

  return (
    <StyledLink
      className={className}
      onClick={onClick}
      {...destinationProp}
      target={target}
      rel={rel}
      external={external}
    >
      {children}
    </StyledLink>
  );
};
