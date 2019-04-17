import React from 'react';
import { storiesOf } from '@storybook/react';
import LabeledValue from './index';
import { Currency, Typography, Development, Flexbox } from '../..';

storiesOf('Molecules | LabeledValue', module)
  .add('Default', () => <LabeledValue label="Label">Value</LabeledValue>)
  .add('Integration: LabeledValue secondary currency', () => (
    <LabeledValue label="Market value">
      <Typography type="secondary" weight="bold">
        <Currency value={4672198} currency="SEK" />
      </Typography>
    </LabeledValue>
  ))
  .add('Integration: LabeledValue title1', () => (
    <LabeledValue label="Holdings (SEK)">
      <Typography type="title1">4713119</Typography>
    </LabeledValue>
  ))
  .add('Integration: LabeledValue with positive development and currency', () => (
    <LabeledValue label="Development this year">
      <Flexbox.Container direction="row" gutter={2}>
        <Flexbox.Item>
          <Typography type="secondary" weight="bold">
            <Development value={9.2} />
          </Typography>
        </Flexbox.Item>
        <Flexbox.Item>
          <Typography type="secondary" weight="bold">
            <Currency sign value={4672198} currency="SEK" />
          </Typography>
        </Flexbox.Item>
      </Flexbox.Container>
    </LabeledValue>
  ))
  .add('Integration: LabeledValue with negative development and currency', () => (
    <LabeledValue label="Development this year">
      <Flexbox.Container direction="row" gutter={2}>
        <Flexbox.Item>
          <Typography type="secondary">
            <Development value={-9.2} />
          </Typography>
        </Flexbox.Item>
        <Flexbox.Item>
          <Typography type="secondary" weight="bold">
            <Currency sign value={-4672198} currency="SEK" />
          </Typography>
        </Flexbox.Item>
      </Flexbox.Container>
    </LabeledValue>
  ));
