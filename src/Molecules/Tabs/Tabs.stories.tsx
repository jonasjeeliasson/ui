import { storiesOf } from '@storybook/react';
import React from 'react';
import Tabs from './Tabs';
import {Typography} from '../../../';

storiesOf('Molecules | Tabs', module).add('Default Tabs component', () => (
  <Typography type="secondary">
    <Tabs.Container>
      <Tabs.Item title="One">Ones children</Tabs.Item>
      <Tabs.Item title="Node as well 👎">Moving focus from a tab will put it on the next <a href="#">focusable</a> item in the tab panel.</Tabs.Item>
    </Tabs.Container>
  </Typography>
));
