import { computed, h, defineComponent, PropType } from 'vue'

import { useI18nProvide } from './hooks'
import { KottiI18n } from './types'

const KtI18nContext = defineComponent({
	name: 'KtI18nContext',
	props: {
		currencyMap: {
			default: (): KottiI18n.Props['currencyMap'] => ({}),
			type: Object,
		},
		locale: {
			required: true,
			type: String as PropType<KottiI18n.SupportedLanguages>,
		},
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
	setup(props, { slots }) {
		useI18nProvide({
			currencyMap: computed(() => props.currencyMap),
			locale: computed(() => props.locale),
			messages: computed(() => props.messages),
			numberFormat: computed(() => props.numberFormat),
		})

		return () => h('div', [slots.default?.()])
	},
})

export { KtI18nContext }
