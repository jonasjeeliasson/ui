import React from 'react';
import styled from 'styled-components';

import { TabsWithState, CardWithTitle } from '../..';
import { Component } from './CardWithTabs.types';

const Spacing = styled.div`
  padding-left: ${p => p.theme.spacing.unit(5)}px;
  padding-right: ${p => p.theme.spacing.unit(5)}px;
  padding-top: ${p => p.theme.spacing.unit(4)}px;
`;

export const CardWithTabs: Component = ({ title, children }) => (
  <CardWithTitle title={<Spacing>{title}</Spacing>}>
    <TabsWithState>{children}</TabsWithState>
  </CardWithTitle>
);

CardWithTabs.Tab = TabsWithState.Tab;
