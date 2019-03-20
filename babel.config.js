module.exports = api => {
  const presets = [
    '@babel/preset-react',
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        modules: api.env('esm') ? false : 'auto',
        targets: {
          node: 'current',
          browsers: ['last 2 versions'],
        },
      },
    ],
  ];

  const plugins = [
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-styled-components',
    'ramda',
    'babel-plugin-typescript-to-proptypes',
  ];

  // if (process.env.NODE_ENV !== 'production') {
  //   plugins.push('babel-plugin-typescript-to-proptypes');
  // }

  return { comments: false, presets, plugins };
};
