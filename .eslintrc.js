module.exports = {
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 2018,
    },
    env: {
        browser: true,
    },
    rules: {
        'no-unused-vars': ['error', { args: 'none' }]
    },
    overrides: [{
        files: ['gulpfile.js'],
        env: {
            browser: false,
            node: true,
        }
    }]
};
