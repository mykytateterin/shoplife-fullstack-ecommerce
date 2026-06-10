import js from '@eslint/js';
import type { Linter } from 'eslint';
import gitignore from 'eslint-config-flat-gitignore';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsonc from 'eslint-plugin-jsonc';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

type Target = 'base' | 'react' | 'node';

const tsLikeFilesClaim = {
  files: ['**/*.{ts,tsx,mts,cts}'],
};

const jsAndTsLikeFilesClaim = {
  files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
};

const jsonLikeFilesClaim = {
  files: ['**/*.{json,jsonc,json5}'],
};

const createConfig = (rootDir: string, target: Target): Linter.Config[] => {
  const targetGlobals =
    target === 'react' ? globals.browser : target === 'node' ? globals.node : undefined;

  const jsAndTsLanguageOptions: Linter.LanguageOptions = {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: rootDir,
    },
    ...(targetGlobals && { globals: targetGlobals }),
  };

  const commonConfig: Linter.Config[] = [
    gitignore(),
    js.configs.recommended,
    ...jsonc.configs['flat/recommended-with-json'],
    {
      ...jsAndTsLikeFilesClaim,
      languageOptions: jsAndTsLanguageOptions,
      plugins: {
        'simple-import-sort': simpleImportSort,
        '@typescript-eslint': tseslint.plugin,
      },
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
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          { accessibility: 'no-public' },
        ],
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
      },
    },
    {
      ...jsonLikeFilesClaim,
      rules: {
        'jsonc/array-bracket-spacing': ['error', 'never'],
        'jsonc/sort-array-values': [
          'error',
          {
            pathPattern: '.*',
            order: { natural: true },
          },
        ],
        'jsonc/sort-keys': [
          'error',
          'asc',
          {
            natural: true,
          },
        ],
      },
    },
    ...tseslint.configs.strictTypeChecked.map((config) => ({
      ...config,
      ...tsLikeFilesClaim,
    })),
    ...tseslint.configs.stylisticTypeChecked.map((config) => ({
      ...config,
      ...tsLikeFilesClaim,
    })),
  ];

  const targetSpecific: Linter.Config[] = [];

  if (target === 'react') {
    const reactFlatConfigs = reactPlugin.configs.flat;
    const jsxRuntimeConfig = reactFlatConfigs['jsx-runtime'];

    if (jsxRuntimeConfig) {
      targetSpecific.push({
        ...jsxRuntimeConfig,
        ...jsAndTsLikeFilesClaim,
      });
    }

    const reactHooksFlatConfig = (
      reactHooks as unknown as {
        configs: { flat: { recommended: Linter.Config } };
      }
    ).configs.flat.recommended;

    targetSpecific.push({
      ...jsAndTsLikeFilesClaim,
      plugins: {
        ...reactHooksFlatConfig.plugins,
        'react-refresh': reactRefresh,
      },
      rules: {
        ...reactHooksFlatConfig.rules,
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true, allowExportNames: ['meta', 'links'] },
        ],
      },
    });
  }

  return [...commonConfig, ...targetSpecific, eslintConfigPrettier];
};

export { createConfig };
