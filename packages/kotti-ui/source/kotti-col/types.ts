import type { SpecifyRequiredProps } from '../types/utilities'

/* eslint-disable no-magic-numbers */
type UpTo24 =
	| 1
	| 2
	| 3
	| 4
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15
	| 16
	| 17
	| 18
	| 19
	| 20
	| 21
	| 22
	| 23
	| 24
/* eslint-enable no-magic-numbers */

type MediaQueryProps = {
	[KEY in 'lg' | 'md' | 'sm' | 'xl' | 'xs']: UpTo24 | null
}

export namespace KottiCol {
	export type PropsInternal = MediaQueryProps & {
		offset: UpTo24 | null
		pull: UpTo24 | null
		push: UpTo24 | null
		span: UpTo24
		tag: string
	}

	export type Props = SpecifyRequiredProps<PropsInternal, never>
}
