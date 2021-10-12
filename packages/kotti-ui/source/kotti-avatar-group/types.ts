import { KottiAvatar } from '../kotti-avatar/types'
import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiAvatarGroup {
	export type PropsInternal = Pick<
		KottiAvatar.PropsInternal,
		'isHoverable' | 'size'
	> & {
		count: number
		isStack: boolean
		items: Pick<KottiAvatar.Props, 'name' | 'src'>[]
	}

	export type Props = SpecifyRequiredProps<PropsInternal, 'items'>
}
