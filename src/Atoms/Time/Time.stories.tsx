import { storiesOf } from '@storybook/react';
import React from 'react';
import Time from './Time';

storiesOf('Atoms | Time', module)
  .add('Time ', () => {
    return <Time value={1554824654} />;
  })
  .add('Invalid value', () => {
    return <Time value={null} />;
  })
  .add('Uses custom symbol for invalid value', () => {
    return <Time value={null} invalidValue="X" />;
  });
