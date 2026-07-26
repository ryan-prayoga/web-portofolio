const config = {
  plugins: ['prettier-plugin-svelte'],
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
  svelteSortOrder: 'options-scripts-markup-styles',
  overrides: [{ files: '*.svg', options: { parser: 'html' } }],
};

export default config;
