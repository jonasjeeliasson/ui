import React from 'react';
import { storiesOf } from '@storybook/react';
import { TabTitle, Flexbox } from '../..';

storiesOf('Atoms | TabTitle', module)
  .add('Default', () => <TabTitle>This is tab title</TabTitle>)
  .add('Active', () => <TabTitle active>This is tab title</TabTitle>)
  .add('Integration: with Flexbox', () => (
    <Flexbox.Container direction="row">
      <Flexbox.Item>
        <TabTitle>TabTitle1</TabTitle>
      </Flexbox.Item>
      <Flexbox.Item>
        <TabTitle active>TabTitle2</TabTitle>
      </Flexbox.Item>
      <Flexbox.Item>
        <TabTitle>TabTitle3</TabTitle>
      </Flexbox.Item>
    </Flexbox.Container>
  ));
