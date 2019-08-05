module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'brace-style': ['error', 'stroustrup'],
    // 'camelcase': 0,
    // 'default-case': 0,
    'indent': ['error',
      4,
      { 'SwitchCase': 1 }
    ],
    'max-len': 0,
    // 'new-cap': 0,
    // 'newline-per-chained-call': 0,
    // 'no-await-in-loop': 0,
    // 'no-bitwise': 0,
    'no-console': 0,
    // 'no-loop-func': 0,
    // 'no-multi-spaces': 0,
    // 'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-plusplus': 0,
    'no-unused-expressions': 0,
    // 'no-use-before-define': 0,
    // 'prefer-destructuring': 0,
    // 'prefer-template': 0,
    'semi': 0,
    'semi-style': ['error', 'first'],

    // 'babel/allowImportExportEverywhere': 0,
  },
  globals: {
    APP_NAME: 'readonly',
    APP_VERSION: 'readonly',
    Atomics: 'readonly',
    MODE: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
};
