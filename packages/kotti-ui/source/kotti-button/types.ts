import { Yoco } from '@3yourmind/yoco'

import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiButton {
	export enum Type {
		DANGER = 'danger',
		DEFAULT = 'default',
		PRIMARY = 'primary',
		SECONDARY = 'secondary',
		TEXT = 'text',
	}

	export enum Size {
		LARGE = 'large',
		MEDIUM = 'medium',
		SMALL = 'small',
	}

	export type PropsInternal = {
		icon: Yoco.Icon | null
		isBlock: boolean
		isLoading: boolean
		isMultiline: boolean
		isSubmit: boolean
		label: string | null
		size: KottiButton.Size
		type: KottiButton.Type
	}

	export type Props = SpecifyRequiredProps<PropsInternal, never>
}
