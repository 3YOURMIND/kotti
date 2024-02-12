import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtButtonVue from './KtButton.vue'
import KtSplitButtonVue from './KtSplitButton.vue'
import { KottiButton, KottiSplitButton } from './types'

const componentFolder = 'kotti-button'

export const KtButton = attachMeta(makeInstallable(KtButtonVue), {
	addedVersion: '0.0.1',
	componentFolder,
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=95%3A123',
	},
	slots: {
		default: {
			description: 'Used to replace label with custom HTML',
			scope: null,
		},
	},
	typeScript: {
		namespace: 'Kotti.Button',
		schema: KottiButton.propsSchema,
	},
})

export const KtSplitButton = attachMeta(makeInstallable(KtSplitButtonVue), {
	addedVersion: '5.7.0',
	componentFolder,
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?type=design&node-id=5586-8691&mode=design&t=x2i9HCwj1BucUZrh-0',
	},
	slots: {},
	typeScript: {
		namespace: 'Kotti.SplitButton',
		schema: KottiSplitButton.propsSchema,
	},
})
