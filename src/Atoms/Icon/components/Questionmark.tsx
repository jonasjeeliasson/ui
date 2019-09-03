import React from 'react';
import styled from 'styled-components';
import { IconBase } from '../IconBase';
import { BaseProps, StyledChildProps } from '../IconBase.types';

const StyledCircle = styled.circle<StyledChildProps>`
  ${p => {
    const strokeColor = p.strokeColorFn ? p.strokeColorFn(p.theme) : p.theme.color.svgStroke;
    return `stroke: ${strokeColor};`;
  }}
`;

export const Questionmark = ({ stroke, ...props }: BaseProps) => {
  return (
    <IconBase {...props}>
      <g fillRule="evenodd" transform="translate(1 1)">
        <StyledCircle strokeColorFn={stroke} fill="none" cx="11" cy="11" r="11" />
        <path
          fill="#000"
          fillRule="nonzero"
          d="M9.4544,13.5528 L9.4544,13.3008 C9.4544,12.1584 9.4376,11.6376 11.1512,10.2432 C11.8904,9.6384 12.4784,9.2184 12.4784,8.496 C12.4784,7.8576 12.0248,7.3536 11.1176,7.3536 C10.1768,7.3536 9.656,7.9416 9.4376,8.6472 L6.9008,8.6472 C7.2368,6.3624 8.9504,5.1696 11.168,5.1696 C13.5032,5.1696 15.0992,6.4128 15.0992,8.3784 C15.0992,9.6888 14.5448,10.3776 13.0496,11.6544 C12.344,12.2424 11.84,12.6456 11.7056,13.3008 L11.6552,13.5528 L9.4544,13.5528 Z M11.9072,14.7288 L11.9072,17.4 L9.2696,17.4 L9.2696,14.7288 L11.9072,14.7288 Z"
        />
      </g>
    </IconBase>
  );
};

Questionmark.displayName = 'Icon.Questionmark';
