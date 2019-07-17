import React from 'react';
import styled from 'styled-components';
import { Props } from './Label.types';
import { Flexbox } from '../..';

const LabelText = styled.span`
  color: ${p => p.theme.color.label};
  cursor: pointer;
`;

export const Label: React.FC<Props> = ({ children, className, text }) => (
  // eslint-disable-next-line
  <label className={className}>
    {children ? (
      <Flexbox container direction="column">
        <Flexbox item as={LabelText}>
          {text}
        </Flexbox>
        <Flexbox item>{children}</Flexbox>
      </Flexbox>
    ) : (
      <LabelText>{text}</LabelText>
    )}
  </label>
);

Label.displayName = 'Label';
