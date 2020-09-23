import { attachMeta, makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtSwitch from './KtSwitch.vue'

attachMeta(makeInstallable(KtSwitch), {
	addedVersion: null,
	deprecated: {
		alternatives: ['KtFieldToggle'],
		reason: 'Replaced by Kotti v2.0.0 Forms',
		version: '3.0.0',
	},
	typeScript: null,
})

export { KtSwitch }
