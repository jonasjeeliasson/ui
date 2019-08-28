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
      fieldId="insert-unique-id"
      label="Label"
      value="11"
      onStepUp={action('step up')}
      onStepDown={action('step down')}
    />
  ))
  .add('With default value (Uncontrolled behaviour)', () => (
    <Input.Number fieldId="insert-unique-id" label="Label" defaultValue="15.2" step="0.1" />
  ))
  .add('With small step (Uncontrolled behaviour)', () => (
    <Input.Number fieldId="insert-unique-id" label="Label" defaultValue="15.200" step="0.005" />
  ))
  .add('With max and min (Uncontrolled behaviour)', () => (
    <Input.Number fieldId="insert-unique-id" label="Label" defaultValue="12" min="10" max="20" />
  ))
  .add('Disabled', () => (
    <Input.Number
      fieldId="insert-unique-id"
      label="Label"
      defaultValue="152.25"
      step="0.25"
      disabled
    />
  ))
  .add('With all actions', () => (
    <Input.Number fieldId="insert-unique-id" label="Label" {...handlers} />
  ))
  .add('Error if value is less than 1', () => {
    const Component = () => {
      const [value, setValue] = React.useState('0');
      const showError = parseInt(value, 10) < 1;

      return (
        <Input.Number
          fieldId="insert-unique-id"
          label="Label"
          step="1"
          onStepUp={x => setValue(x)}
          onStepDown={x => setValue(x)}
          {...(showError ? { error: 'Number needs to be greater than 0' } : {})}
        />
      );
    };
    return <Component />;
  })
  .add('Success', () => <Input.Number fieldId="insert-unique-id" label="Label" success />)
  .add('Extra info below', () => (
    <Input.Number fieldId="insert-unique-id" label="Label" extraInfo="Use wisely this space" />
  ))
  .add('Extra info with error', () => {
    const Component = () => {
      const [value, setValue] = React.useState('');

      return (
        <Input.Number
          fieldId="insert-unique-id"
          label="Label"
          extraInfo="Use wisely this space"
          onChange={e => setValue(e.target.value)}
          {...(value === '' ? { error: 'Enter text' } : {})}
        />
      );
    };
    return <Component />;
  })
  .add('Hidden label', () => <Input.Number fieldId="insert-unique-id" label="Label" hideLabel />);
