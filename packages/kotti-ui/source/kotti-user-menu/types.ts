import { KottiNavbar } from '../kotti-navbar/types'
import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiUserMenu {
	export type SectionLink = KottiNavbar.SectionLink
	export type Section = KottiNavbar.Section

	export type PropsInternal = {
		sections: Array<KottiUserMenu.Section>
		userAvatar: string | null
		userName: string | null
		userStatus: string
	}

	export type Props = SpecifyRequiredProps<
		KottiUserMenu.PropsInternal,
		'sections' | 'userStatus'
	>
}
