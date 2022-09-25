module.exports = {
  extends: ['react-app', 'prettier'],
  plugins: ['prettier', 'jsx-a11y'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        tabWidth: 2,
        printWidth: 100,
        semicolons: true,
        quoteProps: 'as-needed',
        jsxSingleQuote: false,
        bracketSpacing: true,
        jsxBracketSameLine: true,
        arrowParens: 'always',
        endOfLine: 'lf',
      },
    ],
  },
};
