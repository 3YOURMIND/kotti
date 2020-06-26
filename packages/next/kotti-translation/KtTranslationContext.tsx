import { createElement, defineComponent, computed } from '@vue/composition-api'

import { makeInstallable } from '../utilities'

import { useTranslationProvide } from './hooks'
import { KottiTranslation } from './types'

const KtTranslationContext = defineComponent({
	name: 'KtTranslationContext',
	props: {
		locale: { required: true, type: String },
		messages: { default: () => ({}), type: Object },
	},
	setup(props: KottiTranslation.Props, { slots }) {
		useTranslationProvide(
			computed(() => props.locale),
			computed(() => props.messages),
		)

		return () => createElement('div', [slots.default()])
	},
})

makeInstallable(KtTranslationContext)

export { KtTranslationContext }
