import { ESLintUtils } from '@typescript-eslint/utils'

export const createRule = ESLintUtils.RuleCreator(
	(name) =>
		`https://github.com/3YOURMIND/kotti/blob/master/packages/eslint-config/source/rules/${name}.ts`,
)
