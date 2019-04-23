import React from 'react';
import styled from 'styled-components';

import { Tabs, CardWithTitle } from '../..';
import { Component } from './CardWithTabs.types';

const Spacing = styled.div`
  padding-left: ${p => p.theme.spacing.unit(5)}px;
  padding-right: ${p => p.theme.spacing.unit(5)}px;
  padding-top: ${p => p.theme.spacing.unit(4)}px;
`;

export const CardWithTabs: Component = ({ title, children }) => (
  <CardWithTitle title={<Spacing>{title}</Spacing>}>
    <Tabs>{children}</Tabs>
  </CardWithTitle>
);

CardWithTabs.Tab = Tabs.Tab;
