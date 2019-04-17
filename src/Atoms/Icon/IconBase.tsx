import React from 'react';
import styled from 'styled-components';
import { InternalProps, StyledIconBaseProps } from './IconBase.types';

const StyledIconBase = styled.svg<StyledIconBaseProps>`
  ${p => {
    const size = p.size || 5;

    return ` user-select: none;
    width: ${p.theme.spacing.unit(size)}px;
    height: ${p.theme.spacing.unit(size)}px;
    display: inline-block;
    vertical-align: middle;
    fill: currentColor;
    flex-shrink: 0;
    vertical-align: middle;
    color: ${p.colorFn ? p.colorFn(p.theme) : p.theme.color.text};`;
  }}
`;

export const IconBase: React.FC<InternalProps> = (props: InternalProps) => {
  const { className, children, title, size = 5, color } = props;

  return (
    <StyledIconBase
      className={className}
      size={size}
      focusable="false"
      viewBox="0 0 24 24"
      aria-hidden={title ? 'false' : 'true'}
      role={title ? 'img' : 'presentation'}
      colorFn={color}
    >
      {children}
      {title ? <title>{title}</title> : null}
    </StyledIconBase>
  );
};
