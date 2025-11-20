import type { Ref } from 'vue'

import type { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiRow {
	export type Context = {
		gap: Readonly<Ref<number>>
		gutter: Readonly<Ref<number>>
	}

	export enum Align {
		BOTTOM = 'bottom',
		CENTER = 'center',
		TOP = 'top',
	}

	export enum Justify {
		CENTER = 'center',
		END = 'end',
		START = 'start',
	}

	export type PropsInternal = {
		align: Align
		gap: number
		gutter: number
		justify: Justify
		tag: string
	}

	// eslint-disable-next-line @typescript-eslint/no-deprecated
	export type Props = SpecifyRequiredProps<PropsInternal, never>
}
