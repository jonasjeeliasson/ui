import { storiesOf } from '@storybook/react';
import * as React from 'react';

// importing from this folder
// since we are not exporting this component itself
import { FormFieldSimple } from '.';

storiesOf('Molecules | Input / FormFieldSimple', module)
  .add('Docs', () => (
    <p>
      This is a helper component, you are probably looking for something else. The difference
      between this component and the FormField component is that this does not do anything to the
      border of the field.
    </p>
  ))
  .add('Default', () => (
    <FormFieldSimple label="Label" fieldId="unique-id-1">
      <div style={{ background: 'aqua' }}>Pass in any children you want</div>
    </FormFieldSimple>
  ))
  .add('Required', () => (
    <FormFieldSimple label="Label" fieldId="unique-id-1" required>
      <div style={{ background: 'aqua' }}>Pass in any children you want</div>
    </FormFieldSimple>
  ))
  .add('Error', () => (
    <FormFieldSimple label="Label" error="error" fieldId="unique-id-2">
      <div style={{ background: 'aqua' }}>Pass in any children you want</div>
    </FormFieldSimple>
  ))
  .add('Extra info', () => (
    <FormFieldSimple label="Label" extraInfo="Some extra info" fieldId="unique-id-2">
      <div style={{ background: 'aqua' }}>Pass in any children you want</div>
    </FormFieldSimple>
  ));
