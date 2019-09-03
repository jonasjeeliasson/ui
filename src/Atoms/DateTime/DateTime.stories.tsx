import { storiesOf } from '@storybook/react';
import React from 'react';
import DateTime from './DateTime';

storiesOf('Atoms | DateTime', module)
  .add('DateTime', () => {
    return <DateTime value={1554824654} />;
  })
  .add('With date only', () => {
    return <DateTime onlyDate value={1554824654} />;
  })
  .add('With date time as ISO 8601 string', () => {
    return <DateTime value="1999-11-11T11:11+0100" />;
  })
  .add('With date as ISO 8601 string', () => {
    return <DateTime onlyDate value="1999-11-11" />;
  })
  .add('Invalid value', () => {
    return <DateTime value={null} />;
  })
  .add('Uses custom symbol for invalid value', () => {
    return <DateTime value={null} invalidValue="X" />;
  });
