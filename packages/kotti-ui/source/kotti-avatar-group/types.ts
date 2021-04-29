import { KottiAvatar } from '../kotti-avatar/types'
import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiAvatarGroup {
	export type Avatar = KottiAvatar.PropsInternal

	export type PropsInternal = {
		hoverable: boolean
		isStack: boolean
		items: Array<Avatar>
		showItems: number
		showTooltip: boolean
	}
	export type Props = SpecifyRequiredProps<PropsInternal, never>
}
