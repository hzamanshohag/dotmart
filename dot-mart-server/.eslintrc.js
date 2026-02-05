module.exports = {
  root: true,
  ignorePatterns: ['node_modules/', 'dist/', 'build/'],
  env: {
    node: true,
    es2020: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-unused-vars': 'error',
    'no-undef': 'error',
    'no-unused-expressions': 'error',
    'prefer-const': 'error',
  },
};