import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginPlaywright from "eslint-plugin-playwright";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  pluginPlaywright.configs["flat/recommended"], // Use the flat config version
  eslintPluginPrettierRecommended, // Add Prettier rules last
  {
    languageOptions: {
      globals: {
        node: true,
        es2021: true,
      },
    },
    rules: {
      // Your specific rule overrides:
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-const": "warn",
      // Prettier rule is handled by eslintPluginPrettierRecommended
    },
    ignores: [
      "node_modules/",
      "dist/",
      "playwright-report/",
      "monocart-report/",
      "pwmochawesome-report/",
      "results.json",
    ],
  }
);
