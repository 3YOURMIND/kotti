import { computed, h, defineComponent } from '@vue/composition-api'

import { useI18nProvide } from './hooks'
import { KottiI18n } from './types'

const KtI18nContext = defineComponent({
	name: 'KtI18nContext',
	props: {
		currencyMap: {
			default: (): KottiI18n.Props['currencyMap'] => ({}),
			type: Object,
		},
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
		useI18nProvide({
			currencyMap: computed(() => props.currencyMap),
			locale: computed(() => props.locale),
			messages: computed(() => props.messages),
			numberFormat: computed(() => props.numberFormat),
		})

		return () => h('div', [slots.default?.() ?? null])
	},
})

export { KtI18nContext }
