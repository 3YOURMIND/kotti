import { Yoco } from '@3yourmind/yoco'

import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiNavbar {
	export type QuickLink = {
		link: string
		title: string
	}

	export type SectionLink = {
		icon: Yoco.Icon
		isActive: boolean
		title: string
		to: unknown
	}

	export type Section = {
		title: string | null
		links: SectionLink[]
	}

	export enum Theme {
		DARK = 'dark',
		LIGHT = 'light',
		REVERSE = 'reverse',
	}

	export type PropsInternal = {
		isNarrow: boolean
		logoUrl: string
		notification: object | null
		quickLinks: QuickLink[]
		sections: Section[]
		theme: Theme | null
	}

	export type Props = SpecifyRequiredProps<
		PropsInternal,
		'logoUrl' | 'sections'
	>

	export type Translations = {
		menuCollapse: string
		menuExpand: string
		quickLinksTitle: string
	}
}
