import React from 'react';
import { storiesOf } from '@storybook/react';
import { TabTitle, Flexbox } from '../..';
import { Display } from '../../common/Display';

storiesOf('Molecules | TabTitle', module)
  .add('Default', () => <TabTitle>This is tab title</TabTitle>)
  .add('Active', () => <TabTitle active>This is tab title</TabTitle>)
  .add('Different sizes', () => (
    <Display
      items={[
        {
          title: 'Size `s`',
          component: (
            <TabTitle active size="s">
              This is tab title of size s
            </TabTitle>
          ),
        },
        {
          title: 'Size `m`',
          component: (
            <TabTitle active size="m">
              This is tab title of size m
            </TabTitle>
          ),
        },
      ]}
    />
  ))
  .add('Integration: with Flexbox', () => (
    <Flexbox container direction="row" gutter={2}>
      <Flexbox item>
        <TabTitle>TabTitle1</TabTitle>
      </Flexbox>
      <Flexbox item>
        <TabTitle active>TabTitle2</TabTitle>
      </Flexbox>
      <Flexbox item>
        <TabTitle>TabTitle3</TabTitle>
      </Flexbox>
    </Flexbox>
  ));
