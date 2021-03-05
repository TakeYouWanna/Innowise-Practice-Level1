module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['eslint-plugin-html'],
  rules: {
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/prefer-readonly': 'off',
    '@typescript-eslint/no-dynamic-delete': 'off'
  }
}
