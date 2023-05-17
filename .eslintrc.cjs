module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
  ],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'react/function-component-definition': 0,
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/semi': 0,
    'jsx-quotes': ['error', 'prefer-single'],
    'no-restricted-exports': 0,
    'import/extensions': 0,
    'object-curly-newline': 0,
    '@typescript-eslint/brace-style': 0,
    'no-tabs': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/ban-types': 0,
  },
};
