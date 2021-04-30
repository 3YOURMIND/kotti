import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiAvatar {
	export enum Size {
		LARGE = 'lg',
		MEDIUM = 'md',
		SMALL = 'sm',
	}

	export type PropsInternal = {
		isHoverable: boolean
		isSelected: boolean
		name: string | null
		size: Size
		src: string | null
	}

	export type Props = SpecifyRequiredProps<PropsInternal, never>
}
