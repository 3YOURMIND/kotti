import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiButtonGroup {
	export type PropsInternal = Record<string, never>

	export type Props = SpecifyRequiredProps<PropsInternal, never>
}
