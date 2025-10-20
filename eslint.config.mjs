import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort"; // New Plugin

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals"),
                      {
    plugins: {
      "simple-import-sort": simpleImportSort, // Register plugin
    },
    rules: {
      //New Feature: Automatically sort imports and exports
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
];
export default eslintConfig;
