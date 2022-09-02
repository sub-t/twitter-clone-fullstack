const path = require('path');

module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        config: path.join(__dirname, './webpack.config.js'),
        alwaysTryTypes: true,
      },
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['unused-imports', 'import'],
  rules: {
    // import
    'unused-imports/no-unused-imports': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'index',
          'type',
        ],
        pathGroups: [
          {
            pattern: '{react,react-dom/**,react-router-dom,next}',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@src/**',
            group: 'parent',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'never',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports' },
    ],

    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',

    // React 18
    'react/react-in-jsx-scope': 'off',

    // others
    'react/prop-types': 'off',

    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-types': 'off',
  },
};
