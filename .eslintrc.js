module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars-experimental': 'error',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    camelcase: 0,
    eqeqeq: 2,
    yoda: [2, 'never'],
    strict: [2, 'never'],
    'no-extra-boolean-cast': 2,
    'no-lone-blocks': 2,
    // 'no-console': 2,
    'no-plusplus': 0,
    'no-proto': 2,
    'no-self-compare': 2,
    'no-undef': 2,
    'no-unreachable': 2,
    'no-unused-expressions': 2,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-alert': 2,
    'no-caller': 1,
    'no-inline-comments': 0,
    'no-func-assign': 2,
    'no-eval': 2,
    'no-empty': 2,
    'no-const-assign': 2,
    'no-var': 2,
    'no-multiple-empty-lines': [1, { max: 2 }],
    'no-extra-semi': 'error',
    'array-bracket-spacing': [2, 'never'],
    'no-nested-ternary': 0,
    // 'linebreak-style': ['error', 'unix'],
    'linebreak-style': ['off', 'windows'],
    'brace-style': [2, '1tbs', { allowSingleLine: true }],
    'comma-dangle': 0,
    'comma-spacing': [2, { before: false, after: true }],
    'computed-property-spacing': [2, 'never'],
    'use-isnan': 2,
    'default-case': 2,
    'newline-after-var': 0,
    'max-depth': [2, 4],
    'max-params': [2, 4],
    'no-else-return': 2,
    'no-eq-null': 2,
    'no-iterator': 2,
    'no-mixed-spaces-and-tabs': [2, false],
    'no-new-func': 1,
    'no-new-object': 2,
    'no-self-compare': 2,
    // 'no-unused-vars': [2, { vars: 'all', args: 'after-used' }],
    'no-use-before-define': 0,
    'valid-typeof': 2,
    'wrap-iife': [2, 'inside'],
    'max-len': [0, 120, 4],
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    // 注释的斜线和星号后要加空格
    'spaced-comment': [
      2,
      'always',
      {
        block: {
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],
    // new, delete, typeof, void, yield 等表达式前后必须有空格，-, +, --, ++, !, !! 等表达式前后不许有空格
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false,
      },
    ],
    'prefer-const': 'off',
    'prefer-rest-params': 2,
    'consistent-this': [2, 'self', 'that'],
    curly: [2, 'multi-line', 'consistent'],
    'for-direction': 2,
    'getter-return': [2, { allowImplicit: true }],
    'keyword-spacing': 2,
    // new关键字后类名应首字母大写
    'new-cap': [
      2,
      {
        capIsNew: false,
      },
    ],
    'no-await-in-loop': 2,
    'no-class-assign': 2,
    'no-dupe-args': 2,
    'no-duplicate-case': 2,
    'no-duplicate-imports': 2,
    'no-empty-function': 0,
    'no-empty-pattern': 2,
    'no-ex-assign': 2,
    'no-extend-native': [2, { exceptions: ['Array', 'Object'] }],
    'no-extra-parens': [2, 'functions'],
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-multi-assign': 2,
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-empty-function': 0,
    'react/display-name': 0,
    'react/no-find-dom-node': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/ban-types': 0,
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
};
