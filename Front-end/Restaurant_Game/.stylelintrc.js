module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines'],
  plugins: ['stylelint-scss'],
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
