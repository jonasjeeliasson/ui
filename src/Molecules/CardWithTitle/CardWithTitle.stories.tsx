import React from 'react';
import { storiesOf } from '@storybook/react';

import { CardWithTitle } from '../..';

storiesOf('Molecules | CardWithTitle', module)
  .add('Basic CardWithTitle', () => (
    <CardWithTitle title="Konton">A CardWithTitle containing content</CardWithTitle>
  ))
  .add('CardWithTitle with no title', () => (
    <CardWithTitle>A CardWithTitle without title</CardWithTitle>
  ))
  .add('CardWithTitle as article', () => (
    <CardWithTitle as="article">A CardWithTitle as a article containing content</CardWithTitle>
  ))
  .add('CardWithTitle with title as custom component article', () => (
    <CardWithTitle title={<div>Custom component</div>}>
      A CardWithTitle as a article containing content
    </CardWithTitle>
  ));
