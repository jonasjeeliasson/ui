import React from 'react';
import { storiesOf } from '@storybook/react';
import { Typography, Label } from '../..';

storiesOf('Atoms | Label', module).add('Default', () => (
  <Typography type="tertiary">
    <Label text="Name" />
  </Typography>
));
