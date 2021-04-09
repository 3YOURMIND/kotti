import { Yoco } from '@3yourmind/yoco'

export namespace KottiButton {
	export type PropsInternal = {
		icon: Yoco.Icon | ''
		isBlock: boolean
		isMultiline: boolean
		label: string | null
		loading: boolean
		size: 'small' | null
		type: 'primary' | 'secondary' | 'text' | 'danger'
	}

	export type Props = Partial<PropsInternal>

	export enum Event {
		CLICK = 'click',
	}
}
