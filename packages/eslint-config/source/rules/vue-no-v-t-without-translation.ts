import { createRule } from '../utils/eslint-helpers.js'
import utils from 'eslint-plugin-vue/lib/utils/index.js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isTranslated = (translations: Record<string, any>[], key: string) => {
	const path = key.split('.')
	return translations.some((translation) => {
		let pointer = translation
		for (const segment of path) {
			if (!(segment in pointer)) return false
			pointer = pointer[segment]
		}
		return true
	})
}

const description =
	'this rule ensures that all v-t translation strings actually exist in the provided translation objects'

export default createRule({
	name: 'vue-no-v-t-without-translation',
	meta: {
		docs: {
			description,
			requiresTypeChecking: false,
		},
		messages: {
			missingTranslation:
				'Missing Translation. Not found in any known translation inputs',
		},
		schema: [
			{
				type: 'array',
				items: {
					type: 'object',
					additionalProperties: {
						anyOf: [
							{ type: 'string' },
							{
								$ref: '#/definitions/nestedObject',
							},
						],
					},
				},
				definitions: {
					nestedObject: {
						type: 'object',
						additionalProperties: {
							anyOf: [
								{ type: 'string' },
								{
									$ref: '#/definitions/nestedObject',
								},
							],
						},
					},
				},
			},
		],
		type: 'problem',
	},
	defaultOptions: [[]],
	create(context) {
		const translations = context.options[0]

		return utils.defineTemplateBodyVisitor(context, {
			// @ts-expect-error -- let's not guess vue-eslint-plugin's internals
			// eslint-disable-next-line @typescript-eslint/naming-convention
			"VAttribute[directive=true][key.name.name='t']"(node) {
				if (node.value.expression.type !== 'Literal') return // can’t check non-literals easily

				const translationKey = node.value.expression.value

				if (!isTranslated(translations, translationKey))
					context.report({
						node,
						loc: node.loc,
						messageId: 'missingTranslation',
					})
			},
		})
	},
})
