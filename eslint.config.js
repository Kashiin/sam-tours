import globals from 'globals';

export default [
  { ignores: ['node_modules/', 'js/data/'] },
  {
    files: ['js/**/*.js'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: globals.browser },
    rules: { 'no-undef': 'error', 'no-unused-vars': 'warn' },
  },
  {
    files: ['server.cjs'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'commonjs', globals: globals.node },
    rules: { 'no-undef': 'error', 'no-unused-vars': 'warn' },
  },
];
