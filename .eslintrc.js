module.exports = {
  extends: '@cybozu',
  globals: {
    kintone: true,
  },
  rules: {
    'max-len': ['error', {code: 150}],
    'max-statements': ['error', 40],
    'max-depth': ['error', 5],
    'no-unused-vars': ['error'],
    'no-undef': ['error'],
    curly: ['error', 'all'],
  },
};
