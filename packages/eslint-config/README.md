# @3yourmind/eslint-config

## Usage

```ts
import tseslint from 'typescript-eslint'
import eslintConfig3YD from '@3yourmind/eslint-config'

const config = tseslint.config(
	/**
	 * DO NOT ADD ANY OTHER KEYS TO THIS FIRST OBJECT
	 *
	 * @see {@link https://eslint.org/docs/latest/use/configure/ignore#ignoring-files}
	 */
	{
		ignores: ['**/dist/**', '**/.nuxt/**', '**/.turbo/**'], // global ignores
	},
	...eslintConfig3YD.configs.global, // enables recommended eslint settings globally
	{
		languageOptions: {
			ecmaVersion: 2022,
			parserOptions: {
				debugLevel: 'typescript-eslint',
				project: [
					'./tsconfig.json',
					// FIXME: Change these to your `tsconfig.json`s
					// './packages/*/tsconfig.json',
				],
				tsconfigRootDir: 'FIXME: You may want to specify this directory',
			},
			sourceType: 'module',
		},
	},
	...eslintConfig3YD.configs.default.map((config) => ({
		...config,
		// Example: apply config to only these files
		files: ['packages/**/*.ts', 'packages/**/*.tsx'],
	})),
	// Example: apply config to all default files
	...eslintConfig3YD.configs.untyped,
	...eslintConfig3YD.configs.json,
	...eslintConfig3YD.configs.tests.map((config) => ({
		...config,
		// FIXME: Add your custom test files here
		files: [.
			..config.files,
			// 'packages/*/source/test-utils/**/*.ts'
		]
	})),
	...eslintConfig3YD.configs.vue,
	{
		rules: {
			// add your overrides here
			// '@typescript-eslint/no-restricted-imports': 'off',
		},
	},
)

export default config
```

## Installation & Requirements

`@3yourmind/eslint-config` requires `eslint>=9` and its new FlatConfig format

```sh
npm install --save-dev @3yourmind/eslint-config
# or
yarn add --dev @3yourmind/eslint-config
```

## Configurations

- `eslintConfig3YD.configs.default`
  - Should be used on .ts and .tsx files. This enables rules that rely on type checking.
- `eslintConfig3YD.configs.global`
  - Registers plugins and settings that should be globally enabled.
- `eslintConfig3YD.configs.json`
  - Should be used only on JSON files. Treats some files (e.g. tsconfig) as jsonc.
- `eslintConfig3YD.configs.tests`
  - Should be used on test files. It includes vitest-specific rules and turns off rules that would be unhelpful/annoying when writing tests.
- `eslintConfig3YD.configs.untyped`
  - Enables basic rules for javascript files. Use a more specific config if possible

## Custom Rules

- `vue-consistent-ref-names`: <https://github.com/3YOURMIND/kotti/blob/master/packages/eslint-config/source/rules/vue-consistent-ref-names.ts>
- `vue-no-v-model-deep`: <https://github.com/3YOURMIND/kotti/blob/master/packages/eslint-config/source/rules/vue-no-v-model-deep.ts>
- `vue-no-v-t-on-components`: <https://github.com/3YOURMIND/kotti/blob/master/packages/eslint-config/source/rules/vue-no-v-t-on-components.ts>
- `vue-no-v-t-without-translation`: <https://github.com/3YOURMIND/kotti/blob/master/packages/eslint-config/source/rules/vue-no-v-t-without-translation.ts>
