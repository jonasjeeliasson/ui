import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { Input } from '../../..';
import { Display } from '../../../common/Display';

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
  .add('Default', () => <Input.Number fieldId="insert-unique-id" label="Label" />)
  .add('With value (Controlled behaviour)', () => {
    const Component = () => {
      const [value, setValue] = React.useState(10);

      const makeStep = (increment: boolean) => {
        const nextValue = increment ? value + 1 : value - 1;

        setValue(nextValue);
      };

      const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(parseInt(e.currentTarget.value, 10));
      };

      return (
        <Input.Number
          fieldId="insert-unique-id"
          label="Label"
          value={value}
          onChange={onChangeHandler}
          onStepUp={() => makeStep(true)}
          onStepDown={() => makeStep(false)}
        />
      );
    };
    return <Component />;
  })
  .add('With default value (Uncontrolled behaviour)', () => (
    <Input.Number fieldId="insert-unique-id" label="Label" defaultValue="15.2" step="0.1" />
  ))
  .add('With a smaller step', () => (
    <Input.Number fieldId="insert-unique-id" label="Label" defaultValue="15.200" step="0.005" />
  ))
  .add('With max and min', () => (
    <Input.Number fieldId="insert-unique-id" label="Label" defaultValue="12" min="10" max="20" />
  ))
  .add('Required', () => (
    <Input.Number fieldId="insert-unique-id" label="Label" defaultValue="91" required />
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
  .add('With auto focus', () => (
    <Input.Number
      fieldId="insert-unique-id"
      label="Label"
      defaultValue="152.25"
      step="0.25"
      autoFocus
    />
  ))
  .add('With all actions', () => (
    <Input.Number fieldId="insert-unique-id" label="Label" {...handlers} />
  ))
  .add('With error if value is less than 1', () => {
    const Component = () => {
      const [value, setValue] = React.useState('0');
      const showError = parseInt(value, 10) < 1;

      return (
        <Input.Number
          fieldId="insert-unique-id"
          label="Label"
          step="1"
          onStepUp={x => x && setValue(x)}
          onStepDown={x => x && setValue(x)}
          {...(showError ? { error: 'Number needs to be greater than 0' } : {})}
        />
      );
    };
    return <Component />;
  })
  .add('With success', () => <Input.Number fieldId="insert-unique-id" label="Label" success />)
  .add('With extra info below', () => (
    <Input.Number fieldId="insert-unique-id" label="Label" extraInfo="Use wisely this space" />
  ))
  .add('With extra info and error', () => {
    const Component = () => {
      const [value, setValue] = React.useState('0');
      const showError = parseInt(value, 10) < 1;

      return (
        <Input.Number
          fieldId="insert-unique-id"
          label="Label"
          extraInfo="Use wisely this space"
          onStepUp={x => x && setValue(x)}
          onStepDown={x => x && setValue(x)}
          {...(showError ? { error: 'Number needs to be greater than 0' } : {})}
        />
      );
    };
    return <Component />;
  })
  .add('With no steppers', () => (
    <Input.Number fieldId="insert-unique-id" label="Label" noSteppers />
  ))
  .add('With hidden label', () => (
    <Input.Number fieldId="insert-unique-id" label="Label" hideLabel />
  ))
  .add('With size small', () => (
    <Display
      title={`Size = "s"`}
      items={[
        {
          component: <Input.Number fieldId="insert-unique-id" label="Label" size="s" />,
          title: 'Default',
        },
        {
          component: <Input.Number fieldId="insert-unique-id" label="Label" size="s" noSteppers />,
          title: 'No steppers',
        },
        {
          component: (
            <Input.Number
              fieldId="insert-unique-id"
              label="Label"
              size="s"
              error="Some error text that will wrap itself over couple of lines"
            />
          ),
          title: 'Error',
        },
      ]}
    />
  ));
