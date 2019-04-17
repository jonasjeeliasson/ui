import { storiesOf } from '@storybook/react';
import React from 'react';
import Number from './Number';

storiesOf('Atoms | Number', module)
  .add('Number with 2 decimals ', () => {
    return <Number value={10} decimals={2} />;
  })
  .add('Number with 0 decimals ', () => {
    return <Number value={100} decimals={0} />;
  })
  .add('Invalid value', () => {
    return <Number value={null} />;
  })
  .add('Uses custom symbol for invalid value', () => {
    return <Number value={null} invalidValue="X" />;
  });
