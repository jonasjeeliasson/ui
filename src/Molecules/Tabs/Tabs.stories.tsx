import { storiesOf } from '@storybook/react';
import React from 'react';
import Tabs from './Tabs';

storiesOf('Molecules | Tabs', module).add('Default Tabs component', () => (
  <>
    <Tabs.Container>
      <Tabs.Item title="One">Ones children</Tabs.Item>
      <Tabs.Item title="Node as well 👎">I'm a link asdasdasdads</Tabs.Item>
    </Tabs.Container>
  </>
));
