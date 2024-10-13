import type { PropType } from 'vue'
import { computed, defineComponent, h } from 'vue'

import { useI18nProvide } from './hooks'
import type { KottiI18n } from './types'

// eslint-disable-next-line @typescript-eslint/naming-convention
const KtI18nContext = defineComponent({
	name: 'KtI18nContext',
	props: {
		currencyMap: {
			default: (): KottiI18n.Props['currencyMap'] => ({}),
			type: Object as PropType<KottiI18n.Props['currencyMap']>,
		},
		locale: {
			required: true,
			type: String as PropType<KottiI18n.Props['locale']>,
		},
		messages: {
			/**
			 * default to a Partial object, because the provision hook handles
			 * the default values.
			 */
			default: (): KottiI18n.Props['messages'] => ({}),
			type: Object as PropType<KottiI18n.Props['messages']>,
		},
		numberFormat: {
			/**
			 * default to a Partial object, because the provision hook handles
			 * the default values.
			 */
			default: (): KottiI18n.Props['numberFormat'] => ({}),
			type: Object as PropType<KottiI18n.Props['numberFormat']>,
		},
	},
	setup(props, { slots }) {
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
