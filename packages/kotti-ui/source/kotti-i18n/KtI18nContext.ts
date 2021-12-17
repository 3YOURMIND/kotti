import { computed, createElement, defineComponent } from '@vue/composition-api'

import { useI18nProvide } from './hooks'
import { KottiI18n } from './types'

const KtI18nContext = defineComponent({
	name: 'KtI18nContext',
	props: {
		locale: { required: true, type: String },
		messages: {
			/**
			 * default to a Partial object, because the provision hook handles
			 * the default values.
			 */
			default: (): KottiI18n.Props['messages'] => ({}),
			type: Object,
		},
		numberFormat: {
			/**
			 * default to a Partial object, because the provision hook handles
			 * the default values.
			 */
			default: (): KottiI18n.Props['numberFormat'] => ({}),
			type: Object,
		},
	},
	setup(props: KottiI18n.Props, { slots }) {
		useI18nProvide(
			computed(() => props.locale),
			computed(() => props.messages),
			computed(() => props.numberFormat),
		)

		return () => createElement('div', [slots.default()])
	},
})

export { KtI18nContext }
