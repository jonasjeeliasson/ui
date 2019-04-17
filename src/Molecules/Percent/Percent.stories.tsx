import { storiesOf } from '@storybook/react';
import React from 'react';
import Percent from './Percent';

storiesOf('Molecules | Percent', module)
  .add('Percent with 2 decimals ', () => {
    return <Percent value={10} decimals={2} />;
  })
  .add('Percent with 0 decimals ', () => {
    return <Percent value={100} decimals={0} />;
  })
  .add('Invalid value', () => {
    return <Percent value={null} />;
  })
  .add('Uses custom symbol for invalid value', () => {
    return <Percent value={null} invalidValue="X" />;
  });
