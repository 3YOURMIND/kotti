import { attachMeta, makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtRadioGroup from './KtRadioGroup.vue'

attachMeta(makeInstallable(KtRadioGroup), {
	addedVersion: 'unkown',
	deprecated: {
		alternatives: ['KtFieldRadioGroup'],
		reason: 'Replaced by Kotti v2.0.0 Forms',
		version: '3.0.0',
	},
	typeScript: null,
})

export { KtRadioGroup }
