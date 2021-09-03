import { Yoco } from '@3yourmind/yoco'

import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiAccordion {
	export type PropsInternal = {
		icon: Yoco.Icon
		isClosed: boolean
		title: string
	}

	export type Props = SpecifyRequiredProps<PropsInternal, 'title'>
}
