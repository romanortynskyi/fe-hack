module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
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
