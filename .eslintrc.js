module.exports = {
  env: {
    'browser': true,
    'es2021': true,
  },
  extends: [
    'google',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  // add your custom rules here
  rules: {
    // @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
    'eqeqeq': [
      'error',
      'always',
      {
        null: 'ignore'
      }
    ],
    // 不检查分号
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^h$',
        varsIgnorePattern: '^h$'
      }
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^h$',
        varsIgnorePattern: '^h$'
      }
    ],
    'space-before-function-paren': 'off',
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'never']
  }
};
