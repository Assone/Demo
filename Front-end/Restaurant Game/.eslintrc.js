module.exports = {
  'env': {
    'browser': true,
    'es2020': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 11,
    'sourceType': 'module',
  },
  'rules': {
    'object-curly-spacing': ['error', 'always', { 'arraysInObjects': false }],
    'operator-linebreak': ['error', 'after',
      { 'overrides': { '?': 'before', ':': 'before' } },
    ],
  },
};
