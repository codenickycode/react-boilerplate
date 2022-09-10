/* eslint-env node */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
      ],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            // I still want to use async/await in a Promise callback
            checksVoidReturn: false,
          },
        ],
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
