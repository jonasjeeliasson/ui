import React from 'react';
import { storiesOf } from '@storybook/react';
import { Input } from '../../..';

storiesOf('Molecules | Input / Number', module)
  .add('Default', () => <Input.Number fieldId="number1" label="Label" step={1} />)
  .add('With value (Controlled behaviour)', () => (
    <Input.Number fieldId="number2" label="Label" value="11" step={1} />
  ))
  .add('With default value (Uncontrolled behaviour)', () => (
    <Input.Number fieldId="number3" label="Label" defaultValue="15.2" step={0.1} />
  ))
  .add('Disabled', () => (
    <Input.Number fieldId="number4" label="Label" defaultValue="152.25" step={0.25} disabled />
  ));
