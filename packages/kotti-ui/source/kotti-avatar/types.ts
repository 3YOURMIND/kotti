import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiAvatar {
	export type PropsInternal = {
		isHoverable: boolean
		isSelected: boolean
		isSmall: boolean
		name: string
		showTooltip: boolean
		src: string
	}
	export type Props = SpecifyRequiredProps<PropsInternal, never>
}
