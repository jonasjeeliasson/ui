module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react', 'plugin:jest/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
    sourceType: 'module',
    useJSXTextNode: true,
  },
  plugins: ['react', 'jest', 'react-hooks', '@typescript-eslint', 'import'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.d.ts', '.js', '.jsx'],
      },
    },
  },
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': 0,
    'import/no-extraneous-dependencies': 0,
    'react/destructuring-assignment': 0,
    'react/prop-types': 0,
    'prefer-destructuring': 0,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: false,
      },
    ],
    'jsx-a11y/anchor-is-valid': [
      // remove this rule when Link component only render links
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: [],
      },
    ],
  },
  overrides: {
    files: 'src/**/*.stories.tsx',
    rules: {
      'import/no-extraneous-dependencies': 0,
      'import/no-unresolved': 0,
    },
  },
};
