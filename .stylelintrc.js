module.exports = {
    plugins: [
        'stylelint-scss',
    ],
    extends: [
        'stylelint-config-recommended-scss',
    ],
    rules: {
        'no-descending-specificity': null,
    },
};
