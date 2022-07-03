module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  extends: ['react-app', 'react-app/jest', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'warn',
  },
}
