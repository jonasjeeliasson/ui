import React from 'react';

import { Tabs, CardWithTitle } from '../..';
import { Component } from './CardWithTabs.types';

const CardWithTabs: Component = ({ title, children, initialActiveTabIndex }) => (
  <CardWithTitle title={title}>
    <Tabs initialActiveTabIndex={initialActiveTabIndex}>{children}</Tabs>
  </CardWithTitle>
);

CardWithTabs.Tab = Tabs.Tab;

export { CardWithTabs };
