import React from 'react';
import { storiesOf } from '@storybook/react';
import { Input } from '../..';
import { Display } from '../../common/Display';

storiesOf('Molecules | Input', module)
  .add('Default', () => <Input.Text label="Name" />)
  .add('With placeholder text', () => <Input.Text label="Name" placeholder="What's your name?" />)
  .add('With a default value', () => <Input.Text label="Name" defaultValue="John Doe" />)
  .add('Success', () => (
    <Display
      title="Success"
      items={[
        {
          title: 'Small',
          component: <Input.Text label="Address" size="s" success />,
        },
        {
          title: 'Medium (default)',
          component: <Input.Text label="Address" size="m" success />,
        },
      ]}
    />
  ))
  .add('Error', () => (
    <Display
      title="Error"
      items={[
        {
          title: 'Small',
          component: <Input.Text label="City" size="s" error errorMessage="Error message" />,
        },
        {
          title: 'Medium (default)',
          component: <Input.Text label="City" size="m" error errorMessage="Error message" />,
        },
      ]}
    />
  ))
  .add('Disabled', () => (
    <Display
      title="Disabled"
      items={[
        {
          title: 'Small',
          component: (
            <Input.Text label="Username" size="s" placeholder="What's your username?" disabled />
          ),
        },
        {
          title: 'Medium (default)',
          component: (
            <Input.Text label="Username" size="m" placeholder="What's your username?" disabled />
          ),
        },
      ]}
    />
  ));
