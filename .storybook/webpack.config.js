const path = require('path');

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]],
    },
  });
  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.alias = {
    ...config.resolve.alias,
    ['Atoms']: path.resolve(__dirname, '../src/Atoms/'),
    ['Templates']: path.resolve(__dirname, '../src/Templates/'),
  };
  return config;
};
