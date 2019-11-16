module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "global-require": "off",
    "no-underscore-dangle": "off",
    "react/no-danger": "off",
    "react/prop-types": "off",
    "react/no-did-update-set-state": "off",
    "react/jsx-filename-extension": [0],
    "import/no-extraneous-dependencies": "off",
  },
  env: {
    "jest": true,
  },
};
