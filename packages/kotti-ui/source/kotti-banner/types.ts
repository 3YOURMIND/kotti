import { Yoco } from '@3yourmind/yoco'

import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiBanner {
	export type PropsInternal = {
		actionText: string
		icon: Yoco.Icon
		isGray: boolean
		message: string
		switchCloseText: string
		switchText: string
	}

	export type Props = SpecifyRequiredProps<PropsInternal, 'message'>
}
