import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';
import globals from 'globals';
import pluginJs from '@eslint/js';
import babelParser from '@babel/eslint-parser';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      globals: globals.browser,
      parser: babelParser,
      parserOptions: { requireConfigFile: false },
    },
  },
  pluginJs.configs.recommended,
  // mimic ESLintRC-style extends
  ...compat.extends('eslint-config-airbnb-base'),
  {
    rules: {
      'import/no-named-as-default': 0,
      'import/no-named-as-default-member': 0,
      'import/extensions': 0,
      'no-new': 0,
    },
  },
];
