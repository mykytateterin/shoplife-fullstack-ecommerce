import type { Linter } from 'eslint';

import js from '@eslint/js';
import gitignore from 'eslint-config-flat-gitignore';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsonc from 'eslint-plugin-jsonc';
import perfectionist from 'eslint-plugin-perfectionist';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

type Target = 'base' | 'node' | 'react';

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
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: rootDir,
    },
    sourceType: 'module',
    ...(targetGlobals && { globals: targetGlobals }),
  };

  const commonConfig: Linter.Config[] = [
    gitignore(),
    js.configs.recommended,
    ...jsonc.configs['flat/recommended-with-json'],
    {
      ...jsAndTsLikeFilesClaim,
      ...perfectionist.configs['recommended-natural'],
    },
    {
      ...jsAndTsLikeFilesClaim,
      languageOptions: jsAndTsLanguageOptions,
      plugins: {
        '@typescript-eslint': tseslint.plugin,
      },
      rules: {
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
            allowHigherOrderFunctions: true,
            allowTypedFunctionExpressions: true,
          },
        ],
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          { accessibility: 'no-public' },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        'no-console': 'warn',
        'no-undef': 'off',
      },
    },
    {
      ...jsonLikeFilesClaim,
      rules: {
        'jsonc/array-bracket-spacing': ['error', 'never'],
        'jsonc/sort-array-values': [
          'error',
          {
            order: { natural: true },
            pathPattern: '.*',
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
