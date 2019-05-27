import React from 'react';
import styled from 'styled-components';
import { InternalProps, StyledIconBaseProps } from './IconBase.types';

const StyledIconBase = styled.svg<StyledIconBaseProps>`
  ${p => {
    const size = p.size || 5;

    return ` user-select: none;
    width: ${p.theme.spacing.unit(size)}px;
    height: ${p.theme.spacing.unit(size)}px;
    fill: currentColor;
    flex-shrink: 0;
    color: ${p.colorFn ? p.colorFn(p.theme) : p.theme.color.text};

    display: ${p.inline ? 'inline-block' : 'block'};
    ${p.inline ? 'vertical-align: middle;' : ''}
    `;
  }}
`;

export const IconBase: React.FC<InternalProps> = (props: InternalProps) => {
  const { className, children, title, size = 5, color, inline } = props;

  return (
    <StyledIconBase
      className={className}
      size={size}
      focusable="false"
      viewBox="0 0 24 24"
      aria-hidden={title ? 'false' : 'true'}
      role={title ? 'img' : 'presentation'}
      colorFn={color}
      inline={inline}
    >
      {children}
      {title ? <title>{title}</title> : null}
    </StyledIconBase>
  );
};
