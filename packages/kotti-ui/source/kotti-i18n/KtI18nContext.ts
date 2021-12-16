import { computed, createElement, defineComponent } from '@vue/composition-api'

import { DecimalSeparator } from '../types/kotti'

import { useI18nProvide } from './hooks'
import { KottiI18n } from './types'

const KtI18nContext = defineComponent({
	name: 'KtI18nContext',
	props: {
		locale: { required: true, type: String },
		messages: { default: () => ({}), type: Object },
		numberFormat: {
			default: (): KottiI18n.NumberFormat => ({
				decimalSeparator: DecimalSeparator.DOT,
			}),
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
