import js from '@eslint/js';
import gitignore from 'eslint-config-flat-gitignore';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsonc from 'eslint-plugin-jsonc';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export const baseConfig = [
  gitignore(),
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx,mts,cts}'],
  })),
  ...tseslint.configs.stylisticTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx,mts,cts}'],
  })),
  ...jsonc.configs['flat/recommended-with-jsonc'],
  { languageOptions: { ecmaVersion: 'latest', sourceType: 'module' } },
  {
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      'no-undef': 'off',
      'no-console': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'jsonc/sort-keys': 'error',
    },
  },
  eslintConfigPrettier,
];

export { globals };
