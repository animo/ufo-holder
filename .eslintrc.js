module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  settings: {
    'import/extensions': ['.js', '.ts', '.tsx', 'jsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
        alwaysTryTypes: true,
      },
    },
  },
  extends: [
    '@react-native-community',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-member-accessibility': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': 'error',
    'no-void': ['error', { allowAsStatement: true }],
    '@typescript-eslint/consistent-type-imports': 'error',
    'import/no-cycle': 'error',
    'react/prop-types': 'off',
    'import/no-unresolved': ['error', { ignore: ['^@env$'] }],
    'react/display-name': 'off',
    'import/order': [
      'error',
      {
        groups: ['type', ['builtin', 'external'], 'parent', 'sibling', 'index'],
        alphabetize: {
          order: 'asc',
        },
        pathGroups: [
          {
            pattern: '@internal',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '@components',
            group: 'parent',
            position: 'before',
          },
        ],
        'newlines-between': 'always',
      },
    ],
  },
  globals: {
    require: true,
  },
  overrides: [
    {
      files: ['.eslintrc.js', '*.config.js'],
      env: {
        node: true,
      },
    },
  ],
}
