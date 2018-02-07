// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'debug' ? 'error' : 'off',
    // single line needn't comma
    "comma-dangle": ["error", "never"],
    "arrow-body-style": 0,
    "object-shorthand": 0,
    "func-names": ["error", "never"],
    "no-param-reassign": 0,
    "array-callback-return": 0,
    "prefer-arrow-callback": 0,
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "max-len":[1,200],
    "no-restricted-syntax": 0,
    "no-lonely-if": 0
  }
};
