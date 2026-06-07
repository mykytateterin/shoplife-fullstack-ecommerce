import js from '@eslint/js';
import gitignore from 'eslint-config-flat-gitignore';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsonc from 'eslint-plugin-jsonc';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const commonConfig = [
  gitignore(),
  js.configs.recommended,
  ...jsonc.configs['flat/recommended-with-jsonc'],
  { languageOptions: { ecmaVersion: 'latest', sourceType: 'module' } },
  {
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      'no-undef': 'off',
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowHigherOrderFunctions: true,
          allowTypedFunctionExpressions: true,
          allowExpressions: true,
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'jsonc/sort-keys': 'error',
    },
  },
];

const typeCheckedConfig = [
  ...tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx,mts,cts}'],
  })),
  ...tseslint.configs.stylisticTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx,mts,cts}'],
  })),
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
];

const jsLikeFileClaim = {
  files: ['**/*.{js,mjs,cjs,ts,tsx,mts,cts}'],
};

export const baseConfig = [...commonConfig, ...typeCheckedConfig, eslintConfigPrettier];

export const rootConfig = [...commonConfig, jsLikeFileClaim, eslintConfigPrettier];

export { globals };
