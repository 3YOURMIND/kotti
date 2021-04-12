import { Ref } from '@vue/composition-api'

import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiRow {
	export type Context = {
		gap: Readonly<Ref<number>>
		gutter: Readonly<Ref<number>>
	}

	export enum Align {
		TOP = 'top',
		CENTER = 'center',
		BOTTOM = 'bottom',
	}

	export enum Justify {
		START = 'start',
		CENTER = 'center',
		END = 'end',
	}

	export type PropsInternal = {
		align: Align
		gap: number
		gutter: number
		justify: Justify
		tag: string
	}

	export type Props = SpecifyRequiredProps<PropsInternal, never>
}
