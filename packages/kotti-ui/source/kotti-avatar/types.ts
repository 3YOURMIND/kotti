import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiAvatar {
	export type PropsInternal = {
		hoverable: boolean
		name: string
		selected: boolean
		showTooltip: boolean
		small: boolean
		src: string
	}
	export type Props = SpecifyRequiredProps<PropsInternal, never>
}
