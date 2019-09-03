import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BrowserRouter } from 'react-router-dom';
import { Link, Typography } from '../..';

storiesOf('Molecules | Link', module)
  .add('Default usage', () => (
    <BrowserRouter>
      <Typography type="secondary" weight="bold">
        <Link to="startpage" onClick={action('clicked')}>
          Link
        </Link>
      </Typography>
    </BrowserRouter>
  ))
  .add('With typography primary as type', () => (
    <BrowserRouter>
      <Typography type="primary" weight="bold">
        <Link to="startpage" onClick={action('clicked')}>
          Link
        </Link>
      </Typography>
    </BrowserRouter>
  ))
  .add('External link with its default values', () => (
    <BrowserRouter>
      <Typography type="secondary" weight="bold">
        <Link to="http://www.google.com" onClick={action('clicked')} external>
          Link
        </Link>
      </Typography>
    </BrowserRouter>
  ))
  .add('External link with rel and target overriden', () => (
    <BrowserRouter>
      <Typography type="secondary" weight="bold">
        <Link
          to="http://www.google.com"
          rel="nofollow"
          target="_self"
          onClick={action('clicked')}
          external
        >
          Link
        </Link>
      </Typography>
    </BrowserRouter>
  ))
  .add('With disabled prop results in a disabled button looking like a link', () => (
    <BrowserRouter>
      <Typography type="secondary" weight="bold">
        <Link onClick={action('clicked')} disabled>
          Link
        </Link>
      </Typography>
    </BrowserRouter>
  ))
  .add('Without to prop results in a button looking like a link', () => (
    <BrowserRouter>
      <Typography type="secondary" weight="bold">
        <Link onClick={action('clicked')}>Link</Link>
      </Typography>
    </BrowserRouter>
  ));
