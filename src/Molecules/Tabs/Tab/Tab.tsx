import React from 'react';
import styled from 'styled-components';

import NormalizedElements from '../../../common/NormalizedElements'
import { Props } from './Tab.types';
import Text from '../../../Atoms/Text';

const Button  = styled(NormalizedElements.Button)`
  background: none;
  border: none;
  padding: 0;
  margin-right: ${props => props.theme.spacing.unit(5)}px;
  padding-bottom: ${props => props.theme.spacing.unit(1)}px;
  border-bottom: 2px solid ${props => props.selected ? props.theme.color.activeBorder: 'transparent'};
`;  

const Tab: React.FunctionComponent<Props> = ({
  children,
  setRef,
  selected,
  index,
  onClick = () => null,
}) => (
  <li role="presentation">
    <Button
      type="button"
      onClick={() => onClick(index)}
      ref={setRef}
      aria-selected={selected}
      role="tab"
      id={`tabs-tab-${index}`}
      tabIndex={selected ? 0 : -1}
      selected={selected}
    >
      <Text.Secondary weight={selected ? 'bold' : 'regular'}>
        {children}
      </Text.Secondary>
    </Button>
  </li>
);

export { Tab };
