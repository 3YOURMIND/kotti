import { Kotti } from '../types'
import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiAvatarGroup {
	export type PropsInternal = Pick<
		Kotti.Avatar.PropsInternal,
		'isHoverable' | 'size'
	> & {
		isStack: boolean
		items: Pick<Kotti.Avatar.Props, 'isSelected' | 'name' | 'src'>[]
		showItems: number
	}

	export type Props = SpecifyRequiredProps<PropsInternal, 'items'>
}
