import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,

  {
    "env": {
      "browser": true,
      "es2021": true,
      "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
      "ecmaVersion": 12,
      "sourceType": "module"
    },
    "rules": {
      "indent": ["error", 2],
      "quotes": ["error", "double"],
      "semi": ["error", "always"]
    }
  }
];