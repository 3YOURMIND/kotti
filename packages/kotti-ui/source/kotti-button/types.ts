import { Yoco } from '@3yourmind/yoco'

export namespace KottiButton {
	export enum Type {
		PRIMARY = 'primary',
		SECONDARY = 'secondary',
		TEXT = 'text',
		DANGER = 'danger',
	}

	export enum Size {
		SMALL = 'small',
		LARGE = 'large',
	}

	export type PropsInternal = {
		icon: Yoco.Icon | null
		isBlock: boolean
		isMultiline: boolean
		label: string | null
		loading: boolean
		size: KottiButton.Size
		type: KottiButton.Type
	}

	export type Props = Partial<PropsInternal>
}
