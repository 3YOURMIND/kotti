import { Yoco } from '@3yourmind/yoco'

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
		logoUrl: string
		notification: object | null
		quickLinks: QuickLink[]
		sections: Section[]
		theme: Theme | null
	}

	export type Props = Partial<Omit<PropsInternal, 'logoUrl' | 'sections'>> &
		Pick<PropsInternal, 'logoUrl' | 'sections'>

	export type Translations = {
		menuCollapse: string
		menuExpand: string
		quickLinksTitle: string
	}
}
