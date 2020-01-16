module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-debugger': 'off',
    'no-console': 'off',
    'no-undef' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
