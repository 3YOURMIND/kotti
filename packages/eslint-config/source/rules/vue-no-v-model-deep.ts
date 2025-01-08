import utils from 'eslint-plugin-vue/lib/utils/index.js'

import { createRule } from '../utils/eslint-helpers.js'

const description = `
this rule ensures that components never use \`v-model\` to deeply mutate data
as it is not safe to do so. It can cause unpredictable bugs in any part of the app
that are extremely hard to track down.
`
export default createRule({
	create(context) {
		return utils.defineTemplateBodyVisitor(context, {
			// @ts-expect-error -- let's not guess vue-eslint-plugin's internals
			// eslint-disable-next-line @typescript-eslint/naming-convention
			"VElement VAttribute[directive=true][key.name.name='model']"(node) {
				if (node.value.expression.object)
					context.report({
						loc: node.loc,
						messageId: 'avoidDeepAttributesInProps',
						node,
					})
			},
		})
	},
	defaultOptions: [],
	meta: {
		docs: {
			description,
		},
		messages: {
			avoidDeepAttributesInProps:
				'v-model should never be used deeply, as it causes unpredictable errors that are nearly impossible to debug',
		},
		schema: [],
		type: 'problem',
	},
	name: 'vue-no-v-model-deep',
})
