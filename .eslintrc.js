module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  rules: {
    quotes: [2, 'single'],
    '@typescript-eslint/no-non-null-assertion': 0
  }
};
