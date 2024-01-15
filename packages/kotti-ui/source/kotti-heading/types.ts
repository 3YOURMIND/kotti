import { Yoco } from '@3yourmind/yoco'

import { SpecifyRequiredProps } from '../types/utilities'

export module KottiHeading {
	export type InteralProps = {
		actionText: string | null
		icon: Yoco.Icon | null
		text: string
		toggleCloseText: string
		toggleStatus: boolean
		toggleText: string
		type: 'action' | 'toggle' | null
	}

	export type Props = SpecifyRequiredProps<InteralProps, 'text'>
}
