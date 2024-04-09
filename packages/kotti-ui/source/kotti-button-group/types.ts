import type { SpecifyRequiredProps } from '../types/utilities'

export module KottiButtonGroup {
	export type PropsInternal = Record<string, never>

	export type Props = SpecifyRequiredProps<PropsInternal, never>
}
