import { baseConfig, globals } from '@shoplife/eslint-config';

export default [
  ...baseConfig,
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ['./tsconfig.json'],
      },
    },
  },
];
