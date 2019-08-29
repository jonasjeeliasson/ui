const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const registerRequireContextHook = require('babel-plugin-require-context-hook/register');

jest.mock('framer-motion', () => {
  const React = require('react'); // eslint-disable-line global-require
  const Dummy = (type = React.Fragment) => ({ children }) =>
    React.createElement(type, {}, ...(Array.isArray(children) ? children : [children]));

  return {
    motion: {
      span: Dummy('span'),
      div: Dummy('div'),
    },
    AnimatePresence: Dummy(),
  };
});

registerRequireContextHook();

Enzyme.configure({ adapter: new Adapter() });
