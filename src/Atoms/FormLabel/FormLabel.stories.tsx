import { storiesOf } from '@storybook/react';
import React from 'react';

import { FormLabel } from '../..';

storiesOf('Atoms | FormLabel', module)
  .add('Default', () => (
    <>
      <FormLabel forId="unique-id">Username</FormLabel>
      <input type="text" id="unique-id" />
    </>
  ))
  .add('With hidden label', () => (
    <>
      <FormLabel forId="unique-id-2" hideLabel>
        Username
      </FormLabel>
      <input type="text" id="unique-id-2" />
    </>
  ))
  .add('As a wrapper', () => (
    <>
      <FormLabel>
        Username
        <input type="text" />
      </FormLabel>
    </>
  ));
