import { storiesOf } from '@storybook/react';
import React from 'react';
import MD from 'react-markdown';
import { Number, Typography } from '../..';
import docs from './Number.md';
import { Display } from '../../common/Display';
import { TYPOGRAPHY_TYPES } from '../Typography/Typography';

storiesOf('Atoms | Number', module)
  .add('Documentation', () => (
    <Typography>
      <MD source={docs} />
      <div>
        <Number value={1000000} />
      </div>
      <div>
        <Number value={3400} currency="SEK" />
      </div>
    </Typography>
  ))
  .add('Default', () => (
    <Display
      items={[
        { title: 'value = 1000', component: <Number value={1000} /> },
        { title: 'value = 9000000', component: <Number value={9000000} /> },
        { title: 'value = 0.01', component: <Number value={0.01} /> },
        { title: 'value = 111.2', component: <Number value={111.2} /> },
      ]}
    />
  ))
  .add('Number with 2 decimals ', () => {
    return (
      <Display
        items={[
          { title: 'value = 10.378', component: <Number value={10.378} decimals={2} /> },
          { title: 'value = 10.333', component: <Number value={10.333} decimals={2} /> },
          { title: 'value = 10', component: <Number value={10} decimals={2} /> },
          { title: 'value = 10.5', component: <Number value={10.5} decimals={2} /> },
        ]}
      />
    );
  })
  .add('Number ticks', () => {
    const ticks = [
      {
        decimals: 4,
        fromPrice: 0,
        toPrice: 0.9999,
        tick: 0.0001,
      },
      {
        decimals: 2,
        fromPrice: 1,
        toPrice: 99999.98,
        tick: 0.01,
      },
      {
        decimals: 1,
        fromPrice: 100000,
        toPrice: 999999.89,
        tick: 0.1,
      },
    ];
    return (
      <>
        <pre>{`ticks = ${JSON.stringify(ticks, null, 2)}`}</pre>
        <Display
          items={[
            { title: 'value = 0.55555', component: <Number value={0.55555} ticks={ticks} /> },
            { title: 'value = 10.333', component: <Number value={10.333} ticks={ticks} /> },
            { title: 'value = 10.5', component: <Number value={10.5} ticks={ticks} /> },
            { title: 'value = 100001.22', component: <Number value={100001.22} ticks={ticks} /> },
          ]}
        />
      </>
    );
  })
  .add('Number with percentage', () => {
    return <Number value={2.3} percentage />;
  })
  .add('Number with currency', () => {
    return <Number value={2.3} currency="SEK" />;
  })
  .add('Number with sign', () => {
    return (
      <Display
        items={[
          { title: 'value = 2', component: <Number value={2} sign /> },
          { title: 'value = 0', component: <Number value={0} sign /> },
          { title: 'value = -1', component: <Number value={-1} sign /> },
        ]}
      />
    );
  })
  .add('Invalid value', () => {
    return <Number value={null} />;
  })
  .add('null currency', () => {
    // @ts-ignore
    return <Number value={10} currency={null} />;
  })
  .add('Integration: with different typographies', () => {
    const items = Object.values(TYPOGRAPHY_TYPES).map(type => ({
      title: type,
      component: (
        <Typography type={type}>
          <Display
            items={[
              { title: 'value = 1000', component: <Number value={1000} /> },
              { title: 'value = 9000000', component: <Number value={9000000} /> },
              { title: 'value = 0.01', component: <Number value={0.01} /> },
              { title: 'value = 111.2', component: <Number value={111.2} /> },
            ]}
          />
        </Typography>
      ),
    }));
    return <Display items={items} />;
  });
