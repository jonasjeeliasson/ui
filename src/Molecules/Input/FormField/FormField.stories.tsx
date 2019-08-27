import { storiesOf } from '@storybook/react';
import * as React from 'react';

// importing from this folder
// since we are not exporting this component itself
import { FormField } from '.';

storiesOf('Molecules | Input / FormField', module)
  .add('Docs', () => <p>This is a helper component, you are probably looking for something else</p>)
  .add('Default', () => (
    <FormField label="Label">
      <div style={{ background: 'aqua', width: '100%' }}>Pass in any children you want</div>
    </FormField>
  ))
  .add('Error', () => (
    <FormField label="Label" error="error">
      <div style={{ background: 'aqua', width: '100%' }}>Pass in any children you want</div>
    </FormField>
  ))
  .add('Extra info', () => (
    <FormField label="Label" extraInfo="Some extra info">
      <div style={{ background: 'aqua', width: '100%' }}>Pass in any children you want</div>
    </FormField>
  ));
