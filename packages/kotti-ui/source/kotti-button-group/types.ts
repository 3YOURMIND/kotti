import type { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiButtonGroup {
	export type PropsInternal = Record<string, never>

	// eslint-disable-next-line @typescript-eslint/no-deprecated
	export type Props = SpecifyRequiredProps<PropsInternal, never>
}
