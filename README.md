# @nordnet/ui

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][codecov-image]][codecov-url]
[![Dependency Status][depstat-image]][depstat-url]

## Installation

```js
npm install --save @nordnet/ui # or
yarn add @nordnet/ui
```

## Usage

```javascript
// src/root.js
import { ThemeProvider } from 'styled-components';
import { theme } from '@nordnet/ui';
import App from './App';

const Root = (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
ReactDOM.render(Root, document.getElementById('app'));

// src/App.js
import { Button } from '@nordnet/ui';

const App = props => (
  <div>
    <Button size="l" variant="secondary">
      Hit me
    </Button>
  </div>
);

export default App;
```

## Developing

Developing workflow can be found in the [contributing guidelines](CONTRIBUTING.md).

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](CONTRIBUTING.md).

## License

This open source project released by Nordnet is licensed under the MIT license.

MIT (http://www.opensource.org/licenses/mit-license.php)

[npm-url]: https://npmjs.org/package/@nordnet/ui
[npm-image]: https://img.shields.io/npm/v/@nordnet/ui/latest.svg
[travis-url]: https://travis-ci.com/nordnet/ui/
[travis-image]: https://img.shields.io/travis/com/nordnet/ui.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/nordnet/ui
[codecov-image]: https://img.shields.io/codecov/c/github/nordnet/ui.svg?style=flat-square
[depstat-url]: https://david-dm.org/nordnet/ui
[depstat-image]: https://david-dm.org/nordnet/ui.svg?style=flat-square
