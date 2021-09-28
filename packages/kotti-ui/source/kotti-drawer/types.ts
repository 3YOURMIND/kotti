import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiDrawer {
	export type PropsInternal = {
		disallowCloseOutside: boolean
		defaultWidth: string | null
		expandWidth: string | null
		isWide: boolean
	}

	export type Props = SpecifyRequiredProps<PropsInternal, never>
}
