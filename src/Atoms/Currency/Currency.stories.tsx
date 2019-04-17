import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, select } from '@storybook/addon-knobs';

import { Currency, Typography } from '../..';
import { Display } from '../../common/Display';
import { TYPOGRAPHY_TYPES } from '../Typography/Typography';

const inputs = (): [number, string] => {
  const value = number('value', 234234);
  const currency = select(
    'currency',
    {
      SEK: 'SEK',
      NOK: 'NOK',
      DKK: 'DKK',
      USD: 'USD',
    },
    'SEK',
  );
  return [value, currency];
};

storiesOf('Atoms | Currency', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const [value, currency] = inputs();
    return <Currency value={value} currency={currency} />;
  })
  .add('Integration: Usage with different typographies ', () => {
    const [value, currency] = inputs();
    const items = Object.values(TYPOGRAPHY_TYPES).map(type => ({
      title: type,
      component: (
        <Typography type={type}>
          <Currency value={value} currency={currency} />
        </Typography>
      ),
    }));
    return <Display items={items} />;
  });
