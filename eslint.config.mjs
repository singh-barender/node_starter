import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    rules: {
      // Node.js and Express specific rules
      'no-process-exit': 'off', // Allow process.exit calls (useful for CLI tools)

      // Best practices
      'no-implicit-coercion': 'warn', // Warn on implicit type coercion (e.g., `!!x`)

      // Code style
      semi: [2, 'always'],
      camelcase: ['warn', { properties: 'always' }], // Enforce camelCase naming convention
      'max-len': ['warn', { code: 140, ignoreUrls: true }], // Enforce a maximum line length of 140 characters
      quotes: ['warn', 'single', { avoidEscape: true }] // Enforce single quotes for strings
    }
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
];
