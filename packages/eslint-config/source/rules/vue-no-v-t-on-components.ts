import utils from 'eslint-plugin-vue/lib/utils/index.js'

import { createRule } from '../utils/eslint-helpers.js'

const description = `
this rule ensures that components never get used with \`v-t\` or \`v-text\`
These directives are problematic, since they essentially \`.innerHtml\`-replace
everything inside the main element of the component. This leads to a lot of
visual bugs and unexpected side-effects.
`
export default createRule({
	create(context) {
		return utils.defineTemplateBodyVisitor(context, {
			// @ts-expect-error -- let's not guess vue-eslint-plugin's internals
			// eslint-disable-next-line @typescript-eslint/naming-convention
			"VElement VAttribute[directive=true][key.name.name='t']"(node) {
				const name = node.parent.parent.rawName
				if (name.toLowerCase() !== name || name.includes('-'))
					context.report({
						loc: node.loc,
						messageId: 'avoidUnsupportedVT',
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
			avoidUnsupportedVT:
				"'v-t' is bugged on components. Please use the appropriate props or slots instead.",
		},
		schema: [],
		type: 'problem',
	},
	name: 'vue-no-v-t-on-components',
})
