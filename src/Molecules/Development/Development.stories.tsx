import React from 'react';
import { storiesOf } from '@storybook/react';
import MD from 'react-markdown';

import docs from './Development.md';
import { Development, Typography } from '../..';
import { Display } from '../../common/Display/index';
import { TYPOGRAPHY_TYPES } from '../../Atoms/Typography/Typography';

storiesOf('Molecules | Development', module)
  .add('Documentation', () => (
    <Typography>
      <MD source={docs} />
      <div>
        <Development value={50} currency="SEK" />
      </div>
      <div>
        <Development value={0} percentage />
      </div>
      <div>
        <Development value={-2.3} percentage />
      </div>
    </Typography>
  ))
  .add('Default', () => (
    <Display
      items={[
        { title: 'Positive value', component: <Development value={50} /> },
        { title: 'Zero value', component: <Development value={0} /> },
        { title: 'Negative value', component: <Development value={-200} /> },
      ]}
    />
  ))
  .add('With icon', () => (
    <Display
      items={[
        { title: 'Positive value', component: <Development value={50} icon /> },
        { title: 'Zero value', component: <Development value={0} icon /> },
        { title: 'Negative value', component: <Development value={-200} icon /> },
      ]}
    />
  ))
  .add('As percentage', () => (
    <Display
      items={[
        { title: 'Positive value', component: <Development value={5.4} percentage /> },
        { title: 'Zero value', component: <Development value={0} percentage /> },
        { title: 'Negative value', component: <Development value={-2.1} percentage /> },
      ]}
    />
  ))
  .add('As currency', () => (
    <Display
      items={[
        { title: 'Positive value', component: <Development value={50} currency="USD" /> },
        { title: 'Zero value', component: <Development value={0} currency="USD" /> },
        { title: 'Negative value', component: <Development value={-200} currency="USD" /> },
      ]}
    />
  ))
  .add('Regression: value is non-zero, but rounded value is 0', () => (
    <Display
      items={[
        { title: '`value = 0.3`', component: <Development value={0.3} decimals={0} /> },
        { title: '`value = -0.3`', component: <Development value={-0.3} decimals={0} /> },
      ]}
    />
  ))
  .add('Integration: with different typographies', () => {
    const items = Object.values(TYPOGRAPHY_TYPES).map(type => ({
      title: type,
      component: (
        <Typography type={type}>
          <Display
            items={[
              { title: 'Positive value', component: <Development value={5.4} /> },
              { title: 'Zero value', component: <Development value={0} /> },
              { title: 'Negative value', component: <Development value={-2.1} /> },
            ]}
          />
        </Typography>
      ),
    }));
    return <Display items={items} />;
  });
