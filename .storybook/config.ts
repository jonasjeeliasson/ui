import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { ThemeDecorator } from './ThemeDecorator';
import { setIntlConfig, withIntl } from 'storybook-addon-intl';
// Load the locale data for all your defined locales
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import svLocaleData from 'react-intl/locale-data/sv';
import noLocaleData from 'react-intl/locale-data/no';
import daLocaleData from 'react-intl/locale-data/da';
import fiLocaleData from 'react-intl/locale-data/fi';

addLocaleData(enLocaleData);
addLocaleData(svLocaleData);
addLocaleData(noLocaleData);
addLocaleData(daLocaleData);
addLocaleData(fiLocaleData);

// automatically import all files ending in *.stories.tsx
const req = require.context('../src', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

addDecorator(withA11y);

addDecorator(ThemeDecorator);

setIntlConfig({
  locales: ['sv', 'nb', 'da', 'fi', 'en'],
  defaultLocale: 'en',
  getMessages: () => {},
  getFormats: () => {},
  // Solves problem with snapshots for time component
  timeZone: 'UTC',
});

addDecorator(withIntl);

configure(loadStories, module);
