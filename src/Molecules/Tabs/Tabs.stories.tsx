import React from 'react';
import { storiesOf } from '@storybook/react';

import { Tabs } from '../..';

const stories = storiesOf('Molecules/Tabs', module);


stories.add('Default usage', () => <Tabs
items={[
  {
    name: 'All News',
    content: 'All News tab panel',
  },
  {
    name: 'Recommended News',
    content: (
      <div style={{ fontWeight: 700 }}>Recommended News. Content can be nodes to.</div>
    ),
  },
  {
    name: 'My News',
    content: 'My News tab panel',
  },
]}
/>);