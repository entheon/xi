import js from "@eslint/js";
import * as parser from "@typescript-eslint/parser";
import * as eslintPlugin from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";

// Common configurations
const commonConfig = {
  plugins: {
    prettier,
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        tabWidth: 2,
      },
    ],
  },
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    globals: {
      node: true,
      browser: true,
      require: "readonly",
      localStorage: true,
      document: true,
    },
  },
};

// JavaScript/TypeScript specific configurations
const jstsConfig = {
  ...commonConfig,
  plugins: {
    ...commonConfig.plugins,
    "@typescript-eslint": eslintPlugin,
    react,
    "react-hooks": reactHooks,
  },
  rules: {
    ...commonConfig.rules,
    ...eslintPlugin.configs.recommended.rules,
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
};

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.mjs"],
    ...commonConfig,
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    ...jstsConfig,
    languageOptions: {
      ...commonConfig.languageOptions,
      parser: parser.default,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
