import React from 'react';
import { storiesOf } from '@storybook/react';
import { FormLabel } from '../..';

storiesOf('Atoms | FormLabel', module)
  .add('Docs', () => <p>This is a helper component, you are probably looking for something else</p>)
  .add('Default', () => <FormLabel id="unique-id">This is a form label</FormLabel>);
