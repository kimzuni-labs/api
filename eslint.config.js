import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig } from "eslint/config";



export default defineConfig(
	{
		ignores: [
			"eslint.config.js",
		],
	},
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		extends: [
			eslint.configs.recommended,
		],
		rules: {
			// https://eslint.org/docs/latest/rules/
		},
	},
	{
		extends: [
			tseslint.configs.strictTypeChecked,
			tseslint.configs.stylisticTypeChecked,
		],
		rules: {
			// https://typescript-eslint.io/rules/
			"@typescript-eslint/no-empty-object-type": [
				"off",
			],
			"@typescript-eslint/no-explicit-any": [
				"error",
			],
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					ignoreRestSiblings: true,
				},
			],
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{
					allowAny: false,
					allowBoolean: true,
					allowNever: false,
					allowNullish: true,
					allowNumber: true,
					allowRegExp: false,
				},
			],
			"@typescript-eslint/no-inferrable-types": [
				"off",
			],
		},
	},
	{
		plugins: {
			"@stylistic": stylistic,
		},
		rules: {
			// https://eslint.style/packages/default#rules
			"@stylistic/comma-dangle": [
				"error",
				"always-multiline",
			],
			"@stylistic/comma-spacing": [
				"error",
				{
					before: false,
					after: true,
				},
			],
			"@stylistic/comma-style": [
				"error",
				"last",
			],
			"@stylistic/indent": [
				"error",
				"tab",
			],
			"@stylistic/indent-binary-ops": [
				"error",
				"tab",
			],
			"@stylistic/no-multiple-empty-lines": [
				"error",
				{
					max: 3,
					maxEOF: 0,
					maxBOF: 0,
				},
			],
			"@stylistic/quotes": [
				"error",
				"double",
				{
					avoidEscape: true,
				},
			],
			"@stylistic/semi": [
				"error",
				"always",
			],
		},
	},
);
