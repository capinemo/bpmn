module.exports = {
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  extends: ['airbnb-base', 'plugin:promise/recommended', 'plugin:security/recommended'],
  rules: {
    // Formatting
    'indent': ['warn', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'no-mixed-spaces-and-tabs': ['error'],

    'no-underscore-dangle': 'off', // MongoDB _id field
    'curly': 'off',
    'no-continue': 'off', // Useful for big iteration blocks with many 'return' conditions
    'no-console': ['error'],
    'no-plusplus': 'off', // Ok for increment. Nobody uses in big statements.
    'nonblock-statement-body-position': 'off', // Linebreaks are useful to shorten line length
    'no-param-reassign': 'off',
    'eqeqeq': ['warn', 'always'],
    'no-unused-vars': [
      'warn',
      {
        args: 'all',
        argsIgnorePattern: '^_'
      }
    ],

    'semi': ['error', 'always'],
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ],
    'no-await-in-loop': ['warn'],
    'no-restricted-syntax': 'off',
    'max-len': ['error', 200],
    'import/no-extraneous-dependencies': ['warn']
  }
};
