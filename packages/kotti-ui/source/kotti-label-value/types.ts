import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiLabelValue {
	export enum EmphasisSize {
		NONE = 'none',
		MEDIUM = 'md',
		LARGE = 'lg',
	}
	export enum EmphasisStyle {
		FULL = 'full',
		VALUE = 'value',
	}

	export type PropsInternal = {
		emphasisSize: EmphasisSize
		emphasisStyle: EmphasisStyle
		isHorizontal: boolean
		label: string
		value: string | number | null
	}

	export type Props = SpecifyRequiredProps<PropsInternal, 'label'>
}
