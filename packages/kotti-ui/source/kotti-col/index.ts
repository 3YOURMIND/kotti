import { vuePropsValidators } from '@3yourmind/vue-props-validators'
import {
	createElement,
	computed,
	defineComponent,
	inject,
} from '@vue/composition-api'

import { KT_ROW_CONTEXT } from '../kotti-row/constants'
import { KottiRow } from '../kotti-row/types'
import { makeInstallable } from '../next/utilities'

type MediaQueryProps = {
	[KEY in 'lg' | 'md' | 'sm' | 'xl' | 'xs']: number | null
}

export const KtCol = makeInstallable(
	defineComponent({
		name: 'KtCol',
		props: vuePropsValidators.create({
			lg: {
				default: () => null,
				nullable: true,
				type: vuePropsValidators.Type.INTEGER,
			},
			md: {
				default: () => null,
				nullable: true,
				type: vuePropsValidators.Type.INTEGER,
			},
			offset: {
				default: () => null,
				nullable: true,
				type: vuePropsValidators.Type.INTEGER,
			},
			pull: {
				default: () => null,
				nullable: true,
				type: vuePropsValidators.Type.INTEGER,
			},
			push: {
				default: () => null,
				nullable: true,
				type: vuePropsValidators.Type.INTEGER,
			},
			sm: {
				default: () => null,
				nullable: true,
				type: vuePropsValidators.Type.INTEGER,
			},
			span: {
				// eslint-disable-next-line no-magic-numbers
				default: () => 24,
				nullable: false,
				type: vuePropsValidators.Type.INTEGER,
			},
			tag: {
				default: () => 'div',
				nullable: false,
				type: vuePropsValidators.Type.STRING,
			},
			xl: {
				default: () => null,
				nullable: false,
				type: vuePropsValidators.Type.INTEGER,
			},
			xs: {
				default: () => null,
				nullable: false,
				type: vuePropsValidators.Type.INTEGER,
			},
		}),
		setup(
			props: {
				offset: number | null
				pull: number | null
				push: number | null
				span: number
				tag: string
			} & MediaQueryProps,
			{ slots },
		) {
			const context = inject<KottiRow.Context | null>(KT_ROW_CONTEXT, null)

			const style = computed(() => {
				if (context === null) return undefined

				const { gap, gutter } = context

				return {
					paddingBottom: `${gap.value / 2}px`,
					paddingLeft: `${gutter.value / 2}px`,
					paddingRight: `${gutter.value / 2}px`,
					paddingTop: `${gap.value / 2}px`,
				}
			})

			const classes = computed(() => [
				'kt-col',
				`kt-col-${props.span}`,
				...Object.entries(props)
					.filter(
						([key, value]) =>
							value !== null &&
							['offset', 'pull', 'push', 'xs', 'sm', 'md', 'lg', 'xl'].includes(
								key,
							),
					)
					.map(([key, value]) => `kt-col-${key}-${value}`),
			])

			return () =>
				createElement(
					props.tag,
					{
						class: classes.value,
						style: style.value,
					},
					[slots.default?.() ?? null],
				)
		},
	}),
)
