import utils from 'eslint-plugin-vue/lib/utils/index.js'

import { createRule } from '../utils/eslint-helpers.js'

const description = `
this rule ensures that template refs always end with \`Ref\`, to enforce
a consistent naming policy that can be relied upon
`
export default createRule({
	create(context) {
		return utils.defineTemplateBodyVisitor(context, {
			// @ts-expect-error -- let's not guess vue-eslint-plugin's internals
			// eslint-disable-next-line @typescript-eslint/naming-convention
			"VAttribute[directive=false][key.name='ref']"(node) {
				if (
					typeof node.value.value === 'string' &&
					!node.value.value.endsWith('Ref')
				)
					context.report({
						loc: node.loc,
						messageId: 'avoidName',
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
			avoidName: "Refs to elements or components should always end with 'Ref'",
		},
		schema: [],
		type: 'problem',
	},
	name: 'vue-consistent-ref-names',
})
