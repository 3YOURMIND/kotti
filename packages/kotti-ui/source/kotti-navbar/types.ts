import { z } from 'zod'

import { yocoIconSchema } from '@3yourmind/yoco'

import { refinementNonEmpty } from '../zod-utilities/refinements'

export namespace KottiNavbar {
	export type Context = {
		isNarrow: boolean
		theme: KottiNavbar.Theme
	}

	export const notificationSchema = z.object({
		count: z.number().int(),
		link: z.string(),
		title: z.string(),
	})
	export type Notification = z.infer<typeof notificationSchema>

	export const quickLinkSchema = z.object({
		link: z.string(),
		title: z.string(),
	})
	export type QuickLink = z.infer<typeof quickLinkSchema>

	export const sectionLinkSchema = z.object({
		component: z.string().default('a'),
		icon: yocoIconSchema,
		isActive: z.boolean(),
		props: z.record(z.unknown()).optional(),
		title: z.string(),
	})
	export type SectionLink = z.infer<typeof sectionLinkSchema>

	export const sectionSchema = z.object({
		links: z.array(sectionLinkSchema).refine(...refinementNonEmpty),
		title: z.string().nullable(),
	})
	export type Section = z.infer<typeof sectionSchema>

	export enum Theme {
		DARK = 'dark',
		DEFAULT = 'default',
		LIGHT = 'light',
		REVERSE = 'reverse',
	}

	export const propsSchema = z.object({
		footerSection: sectionSchema.nullable().default(null),
		isNarrow: z.boolean().default(false),
		logoUrl: z.string(),
		notification: notificationSchema.nullable().default(null),
		quickLinks: z.array(quickLinkSchema).default(() => []),
		sections: z.array(sectionSchema).refine(...refinementNonEmpty),
		theme: z.nativeEnum(Theme).default(Theme.DEFAULT),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export type Translations = {
		menuCollapse: string
		menuExpand: string
		quickLinksTitle: string
	}
}
