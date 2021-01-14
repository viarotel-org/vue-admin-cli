module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/recommended",
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-strongly-recommended",
    "eslint:recommended",
  ],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "vue/no-v-for-template-key": "off",
    "vue/no-v-model-argument": "off",
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    "vue/no-unused-components": "warn",
    "vue/singleline-html-element-content-newline": "off",
    "vue/html-self-closing": "off",
    "vue/valid-template-root": "off",
    "vue/no-multiple-template-root": "off",
    "no-console": "off",
    "no-debugger": "off",
    "no-empty": "warn",
    "no-unused-vars": "warn",
  },
};
