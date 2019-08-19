import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { Input, Icon, Flexbox, Button } from '../../..';
import { Display } from '../../../common/Display';

// A bit laggy for now, let's optimize later
const handlers = actions(
  'onBlur',
  'onClick',
  'onFocus',
  'onKeyDown',
  'onKeyUp',
  'onKeyPress',
  'onChange',
);

storiesOf('Molecules | Input / Number', module)
  .add('Default', () => <Input.Number fieldId="number1" label="Label" step={1} />)
  .add('With value (Controlled behaviour)', () => (
    <Input.Number fieldId="number2" label="Label" value="11" step={1} />
  ))
  .add('With default value (Uncontrolled behaviour)', () => (
    <Input.Number fieldId="number3" label="Label" defaultValue="15.2" step={0.1} />
  ));
