import { Kotti } from '../types'
import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiAvatarGroup {
	export type PropsInternal = Pick<
		Kotti.Avatar.PropsInternal,
		'isHoverable' | 'size'
	> & {
		count: number
		isStack: boolean
		items: Pick<Kotti.Avatar.Props, 'name' | 'src'>[]
	}

	export type Props = SpecifyRequiredProps<PropsInternal, 'items'>
}
