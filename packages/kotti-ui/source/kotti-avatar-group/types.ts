import { KottiAvatar } from '../kotti-avatar/types'
import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiAvatarGroup {
	export type Avatar = KottiAvatar.PropsInternal

	export type PropsInternal = {
		isHoverable: boolean
		isStack: boolean
		items: Array<Avatar>
		numberOfShownItems: number
		showTooltip: boolean
	}
	export type Props = SpecifyRequiredProps<PropsInternal, never>
}
