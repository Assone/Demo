module.exports = {
  extends: ['stylelint-config-sass-guidelines', 'stylelint-config-standard'],
  rules: {
    'order/properties-order': [
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
    ],
  },
};
