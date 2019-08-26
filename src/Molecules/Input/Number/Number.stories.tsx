import React from 'react';
import { storiesOf } from '@storybook/react';
import { action, actions } from '@storybook/addon-actions';
import { Input } from '../../..';

const handlers = actions(
  'onBlur',
  'onClick',
  'onFocus',
  'onKeyDown',
  'onKeyUp',
  'onKeyPress',
  'onChange',
  'onStepUp',
  'onStepDown',
);

storiesOf('Molecules | Input / Number', module)
  .add('Default', () => <Input.Number fieldId="number1" label="Label" />)
  .add('With value (Controlled behaviour)', () => (
    <Input.Number
      fieldId="number2"
      label="Label"
      value={11}
      onStepUp={action('step up')}
      onStepDown={action('step down')}
    />
  ))
  .add('With value 0.25 (Uncontrolled behaviour)', () => (
    <Input.Number
      fieldId="number22"
      label="Label"
      min={1.25}
      max={2}
      defaultValue={135.25}
      step={0.25}
      onStepUp={action('step up')}
      onStepDown={action('step down')}
    />
  ))
  .add('With value 0.0025 (Uncontrolled behaviour)', () => (
    <Input.Number
      fieldId="number22"
      label="Label"
      defaultValue={135}
      step={0.0025}
      onStepUp={action('step up')}
      onStepDown={action('step down')}
    />
  ))
  .add('With default value (Uncontrolled behaviour)', () => (
    <Input.Number fieldId="number3" label="Label" defaultValue={15.2} step={0.1} />
  ))
  .add('Disabled', () => (
    <Input.Number fieldId="number4" label="Label" defaultValue={152.25} step={0.25} disabled />
  ))
  .add('With all actions', () => <Input.Number fieldId="number6" label="Label" {...handlers} />);
