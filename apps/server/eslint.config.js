import { baseConfig } from '@shoplife/eslint-config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(...baseConfig, {
  languageOptions: {
    globals: globals.node,
  },
});
