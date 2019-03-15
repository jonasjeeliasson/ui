module.exports = api => {
  const presets = [
    '@babel/preset-react',
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

  const plugins = ['@babel/plugin-proposal-class-properties', 'babel-plugin-styled-components'];

  return { comments: false, presets, plugins };
};
